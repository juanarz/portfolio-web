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

    const [profile, profileViewsResponse, reachResponse] = await Promise.all([
      graphRequest(`/${accountId}?fields=${profileFields}`, accessToken),
      graphRequest(`/${accountId}/insights?metric=profile_views&period=day&metric_type=total_value`, accessToken),
      graphRequest(`/${accountId}/insights?metric=reach&period=day`, accessToken),
    ])

    const profileViews = profileViewsResponse.data?.[0]?.total_value?.value || 0
    const reach = getReachValues(reachResponse)
    const latestReach = reach.at(-1)?.value || 0

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
