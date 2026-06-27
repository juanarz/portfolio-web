/* global process */

const GRAPH_API_VERSION = 'v25.0'
const GRAPH_API_BASE_URL = `https://graph.facebook.com/${GRAPH_API_VERSION}`

const json = (response, statusCode, payload) => {
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json')
  response.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600')
  response.end(JSON.stringify(payload))
}

const graphRequest = async (path, accessToken) => {
  const url = new URL(`${GRAPH_API_BASE_URL}${path}`)
  url.searchParams.set('access_token', accessToken)

  const response = await fetch(url)
  const payload = await response.json()

  if (!response.ok || payload.error) {
    const message = payload.error?.message || `Meta Graph API request failed with ${response.status}`
    throw new Error(message)
  }

  return payload
}

const getReachValues = (reachResponse) => {
  const reachMetric = reachResponse.data?.find((metric) => metric.name === 'reach')
  return reachMetric?.values?.map((item) => ({
    value: item.value,
    endTime: item.end_time,
  })) || []
}

const getInsightValue = (insight) => {
  if (!insight) return null
  if (typeof insight.total_value?.value === 'number') return insight.total_value.value
  if (typeof insight.values?.[0]?.value === 'number') return insight.values[0].value
  if (typeof insight.value === 'number') return insight.value
  return null
}

const getMediaInsight = async (mediaId, metric, accessToken) => {
  try {
    const response = await graphRequest(`/${mediaId}/insights?metric=${metric}`, accessToken)
    return [metric, getInsightValue(response.data?.[0])]
  } catch {
    return [metric, null]
  }
}

const getMediaInsights = async (media, accessToken) => {
  const insightMetrics = ['reach', 'saved', 'shares', 'plays', 'views']

  const mediaWithInsights = await Promise.all(
    media.map(async (item) => {
      const insightEntries = await Promise.all(
        insightMetrics.map((metric) => getMediaInsight(item.id, metric, accessToken))
      )
      const insights = Object.fromEntries(
        insightEntries.filter(([, value]) => typeof value === 'number')
      )

      return {
        id: item.id,
        caption: item.caption || '',
        commentsCount: item.comments_count || 0,
        likeCount: item.like_count || 0,
        mediaProductType: item.media_product_type || '',
        mediaType: item.media_type,
        mediaUrl: item.media_url || '',
        permalink: item.permalink,
        thumbnailUrl: item.thumbnail_url || item.media_url || '',
        timestamp: item.timestamp,
        insights,
      }
    })
  )

  return mediaWithInsights
}

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    return json(response, 405, { error: 'Method not allowed' })
  }

  const accountId = process.env.INSTAGRAM_ACCOUNT_ID
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN

  if (!accountId || !accessToken) {
    return json(response, 503, {
      configured: false,
      error: 'Instagram API is not configured',
    })
  }

  try {
    const profileFields = 'id,username,name,followers_count,media_count,profile_picture_url'
    const mediaFields = 'id,caption,comments_count,like_count,media_product_type,media_type,media_url,permalink,thumbnail_url,timestamp'

    const [profile, profileViewsResponse, reachResponse, mediaResponse] = await Promise.all([
      graphRequest(`/${accountId}?fields=${profileFields}`, accessToken),
      graphRequest(`/${accountId}/insights?metric=profile_views&period=day&metric_type=total_value`, accessToken),
      graphRequest(`/${accountId}/insights?metric=reach&period=day`, accessToken),
      graphRequest(`/${accountId}/media?fields=${mediaFields}&limit=6`, accessToken),
    ])

    const profileViews = profileViewsResponse.data?.[0]?.total_value?.value || 0
    const reach = getReachValues(reachResponse)
    const latestReach = reach.at(-1)?.value || 0
    const media = await getMediaInsights(mediaResponse.data || [], accessToken)

    return json(response, 200, {
      configured: true,
      profile: {
        id: profile.id,
        username: profile.username,
        name: profile.name,
        followers: profile.followers_count,
        mediaCount: profile.media_count,
        profilePictureUrl: profile.profile_picture_url,
      },
      insights: {
        profileViews,
        latestReach,
        reach,
      },
      media,
      summary: {
        instagram: {
          handle: `@${profile.username}`,
          followers: profile.followers_count,
          posts: profile.media_count,
          profileViews,
          reach: latestReach,
        },
      },
      trends: {
        instagram: reach.map((item) => item.value),
      },
      updatedAt: new Date().toISOString(),
    })
  } catch (error) {
    return json(response, 502, {
      configured: true,
      error: error.message,
    })
  }
}
