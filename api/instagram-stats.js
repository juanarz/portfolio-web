/* global process */

import { getCache, getStoredInstagramToken, INSTAGRAM_STATS_CACHE_KEY, INSTAGRAM_TOP_MEDIA_CACHE_KEY, setCache, setStoredInstagramToken } from './_instagram-cache.js'

const GRAPH_API_VERSION = 'v25.0'
const GRAPH_API_BASE_URL = `https://graph.facebook.com/${GRAPH_API_VERSION}`

const json = (response, statusCode, payload) => {
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json')
  response.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600')
  response.end(JSON.stringify(payload))
}

const getCachedInstagramStats = async () => {
  return getCache(INSTAGRAM_STATS_CACHE_KEY)
}

const getCachedTopMedia = async () => {
  return getCache(INSTAGRAM_TOP_MEDIA_CACHE_KEY)
}

const setCachedInstagramStats = async (payload) => {
  return setCache(INSTAGRAM_STATS_CACHE_KEY, payload)
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

const getInsightValues = (insight) => {
  if (!insight?.values) return []
  return insight.values.map((item) => ({
    value: item.value,
    endTime: item.end_time,
  }))
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

const getAccountInsight = async (accountId, metric, accessToken, options = {}) => {
  const params = new URLSearchParams({
    metric,
    period: options.period || 'day',
  })

  if (options.metricType) params.set('metric_type', options.metricType)
  if (options.breakdown) params.set('breakdown', options.breakdown)

  try {
    const response = await graphRequest(`/${accountId}/insights?${params.toString()}`, accessToken)
    const insight = response.data?.[0]

    return {
      metric,
      value: getInsightValue(insight),
      values: getInsightValues(insight),
      totalValue: insight?.total_value || null,
    }
  } catch {
    return {
      metric,
      value: null,
      values: [],
      totalValue: null,
    }
  }
}

const getAccountInsights = async (accountId, accessToken, profileViews, reach) => {
  const [
    websiteClicks,
    profileLinksTaps,
    accountsEngaged,
    totalInteractions,
    likes,
    comments,
    shares,
    saves,
    onlineFollowers,
    followerDemographics,
    countryDemographics,
  ] = await Promise.all([
    getAccountInsight(accountId, 'website_clicks', accessToken),
    getAccountInsight(accountId, 'profile_links_taps', accessToken, { metricType: 'total_value' }),
    getAccountInsight(accountId, 'accounts_engaged', accessToken, { metricType: 'total_value' }),
    getAccountInsight(accountId, 'total_interactions', accessToken, { metricType: 'total_value' }),
    getAccountInsight(accountId, 'likes', accessToken, { metricType: 'total_value' }),
    getAccountInsight(accountId, 'comments', accessToken, { metricType: 'total_value' }),
    getAccountInsight(accountId, 'shares', accessToken, { metricType: 'total_value' }),
    getAccountInsight(accountId, 'saves', accessToken, { metricType: 'total_value' }),
    getAccountInsight(accountId, 'online_followers', accessToken, { period: 'lifetime' }),
    getAccountInsight(accountId, 'follower_demographics', accessToken, {
      period: 'lifetime',
      metricType: 'total_value',
      breakdown: 'age,gender',
    }),
    getAccountInsight(accountId, 'follower_demographics', accessToken, {
      period: 'lifetime',
      metricType: 'total_value',
      breakdown: 'country',
    }),
  ])

  return {
    profileActions: {
      profileViews,
      websiteClicks: websiteClicks.value,
      profileLinksTaps: profileLinksTaps.value,
    },
    engagement: {
      accountsEngaged: accountsEngaged.value,
      totalInteractions: totalInteractions.value,
      likes: likes.value,
      comments: comments.value,
      shares: shares.value,
      saves: saves.value,
    },
    audienceActivity: {
      onlineFollowers: onlineFollowers.values,
      followerDemographics: followerDemographics.totalValue?.breakdowns || [],
      countryDemographics: countryDemographics.totalValue?.breakdowns || [],
    },
    reach,
  }
}

const getMediaScore = (media) => {
  const insights = media.insights || {}

  return (
    (insights.views || insights.plays || 0) +
    (insights.reach || 0) * 0.8 +
    (media.likeCount || 0) * 25 +
    (media.commentsCount || 0) * 60 +
    (insights.saved || 0) * 80 +
    (insights.shares || 0) * 90
  )
}

const getTopMedia = (media) =>
  [...media]
    .sort((a, b) => getMediaScore(b) - getMediaScore(a))
    .slice(0, 6)

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    return json(response, 405, { error: 'Method not allowed' })
  }

  const accountId = process.env.INSTAGRAM_ACCOUNT_ID
  const accessToken = await getStoredInstagramToken()

  if (!accountId || !accessToken) {
    return json(response, 503, {
      configured: false,
      error: 'Instagram API is not configured',
    })
  }

  try {
    const profileFields = 'id,username,name,followers_count,media_count,profile_picture_url'
    const mediaFields = 'id,caption,comments_count,like_count,media_product_type,media_type,media_url,permalink,thumbnail_url,timestamp'
    const since = Math.floor((Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000)
    const until = Math.floor(Date.now() / 1000)

    const [profile, profileViewsResponse, reachResponse, mediaResponse] = await Promise.all([
      graphRequest(`/${accountId}?fields=${profileFields}`, accessToken),
      graphRequest(`/${accountId}/insights?metric=profile_views&period=day&metric_type=total_value`, accessToken),
      graphRequest(`/${accountId}/insights?metric=reach&period=day&since=${since}&until=${until}`, accessToken),
      graphRequest(`/${accountId}/media?fields=${mediaFields}&limit=24`, accessToken),
    ])

    const profileViews = profileViewsResponse.data?.[0]?.total_value?.value || 0
    const reach = getReachValues(reachResponse)
    const latestReach = reach.at(-1)?.value || 0
    const media = await getMediaInsights(mediaResponse.data || [], accessToken)
    const accountInsights = await getAccountInsights(accountId, accessToken, profileViews, reach)
    const cachedTopMedia = await getCachedTopMedia()
    const topMedia = cachedTopMedia?.topMedia?.length ? cachedTopMedia.topMedia.slice(0, 6) : getTopMedia(media)

    const payload = {
      configured: true,
      stale: false,
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
      topMedia,
      topMediaUpdatedAt: cachedTopMedia?.updatedAt || null,
      accountInsights,
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
    }

    await setCachedInstagramStats(payload)
    await setStoredInstagramToken({
      accessToken,
      source: 'stats-success',
      lastValidatedAt: new Date().toISOString(),
    })

    return json(response, 200, payload)
  } catch (error) {
    const cachedStats = await getCachedInstagramStats()

    if (cachedStats) {
      return json(response, 200, {
        ...cachedStats,
        stale: true,
        cacheReason: error.message,
      })
    }

    return json(response, 502, {
      configured: true,
      stale: false,
      error: error.message,
    })
  }
}
