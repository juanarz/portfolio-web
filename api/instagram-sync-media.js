/* global process */

import { getStoredInstagramToken, INSTAGRAM_TOP_MEDIA_CACHE_KEY, setCache } from './_instagram-cache.js'

const GRAPH_API_VERSION = 'v25.0'
const GRAPH_API_BASE_URL = `https://graph.facebook.com/${GRAPH_API_VERSION}`
const MEDIA_PAGE_SIZE = 50
const BATCH_SIZE = 50
const DEFAULT_MEDIA_LIMIT = 250
const MEDIA_FIELDS = 'id,caption,comments_count,like_count,media_product_type,media_type,media_url,permalink,thumbnail_url,timestamp'
const INSIGHT_METRICS = ['reach', 'saved', 'shares', 'plays', 'views']

const json = (response, statusCode, payload) => {
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json')
  response.setHeader('Cache-Control', 'no-store')
  response.end(JSON.stringify(payload))
}

const isAuthorized = (request) => {
  if (!process.env.CRON_SECRET) return true
  return request.headers.authorization === `Bearer ${process.env.CRON_SECRET}`
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

const batchGraphRequests = async (relativeUrls, accessToken) => {
  const responses = []

  for (let index = 0; index < relativeUrls.length; index += BATCH_SIZE) {
    const batch = relativeUrls.slice(index, index + BATCH_SIZE).map((relativeUrl) => ({
      method: 'GET',
      relative_url: relativeUrl,
    }))

    const body = new URLSearchParams({
      access_token: accessToken,
      batch: JSON.stringify(batch),
    })

    const response = await fetch(GRAPH_API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })
    const payload = await response.json()

    if (!response.ok || payload.error) {
      const message = payload.error?.message || `Meta batch request failed with ${response.status}`
      throw new Error(message)
    }

    responses.push(...payload)
  }

  return responses
}

const getInsightValue = (insight) => {
  if (!insight) return null
  if (typeof insight.total_value?.value === 'number') return insight.total_value.value
  if (typeof insight.values?.[0]?.value === 'number') return insight.values[0].value
  if (typeof insight.value === 'number') return insight.value
  return null
}

const normalizeMedia = (item, insights = {}) => ({
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
})

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
    .map((item) => ({
      ...item,
      popularityScore: Math.round(getMediaScore(item)),
    }))
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, 12)

const getAllMedia = async (accountId, accessToken) => {
  const mediaLimit = Number(process.env.INSTAGRAM_MEDIA_SYNC_LIMIT || DEFAULT_MEDIA_LIMIT)
  const media = []
  let after = ''

  while (media.length < mediaLimit) {
    const params = new URLSearchParams({
      fields: MEDIA_FIELDS,
      limit: String(Math.min(MEDIA_PAGE_SIZE, mediaLimit - media.length)),
    })

    if (after) params.set('after', after)

    const payload = await graphRequest(`/${accountId}/media?${params.toString()}`, accessToken)
    media.push(...(payload.data || []))

    after = payload.paging?.cursors?.after || ''
    if (!after || !payload.paging?.next) break
  }

  return media
}

const getAllMediaInsights = async (media, accessToken) => {
  const requests = media.flatMap((item) =>
    INSIGHT_METRICS.map((metric) => ({
      mediaId: item.id,
      metric,
      relativeUrl: `${item.id}/insights?metric=${metric}`,
    }))
  )
  const batchResponses = await batchGraphRequests(requests.map((item) => item.relativeUrl), accessToken)
  const insightsByMediaId = new Map()
  let metricsResolved = 0

  batchResponses.forEach((batchResponse, index) => {
    const request = requests[index]
    if (!request || batchResponse.code < 200 || batchResponse.code >= 300 || !batchResponse.body) return

    try {
      const payload = JSON.parse(batchResponse.body)
      if (payload.error) return

      const value = getInsightValue(payload.data?.[0])
      if (typeof value !== 'number') return

      const current = insightsByMediaId.get(request.mediaId) || {}
      current[request.metric] = value
      insightsByMediaId.set(request.mediaId, current)
      metricsResolved += 1
    } catch {
      // Some media types do not support every metric. Ignore those safely.
    }
  })

  return {
    insightsByMediaId,
    metricsResolved,
  }
}

export default async function handler(request, response) {
  if (request.method !== 'GET' && request.method !== 'POST') {
    response.setHeader('Allow', 'GET, POST')
    return json(response, 405, { error: 'Method not allowed' })
  }

  if (!isAuthorized(request)) {
    return json(response, 401, { error: 'Unauthorized' })
  }

  const accountId = process.env.INSTAGRAM_ACCOUNT_ID
  const accessToken = await getStoredInstagramToken()

  if (!accountId || !accessToken) {
    return json(response, 503, {
      synced: false,
      error: 'Instagram API is not configured',
    })
  }

  try {
    const rawMedia = await getAllMedia(accountId, accessToken)
    const { insightsByMediaId, metricsResolved } = await getAllMediaInsights(rawMedia, accessToken)
    const media = rawMedia.map((item) => normalizeMedia(item, insightsByMediaId.get(item.id) || {}))
    const topMedia = getTopMedia(media)
    const payload = {
      synced: true,
      accountId,
      scannedMedia: rawMedia.length,
      metricsRequested: rawMedia.length * INSIGHT_METRICS.length,
      metricsResolved,
      topMedia,
      updatedAt: new Date().toISOString(),
    }

    await setCache(INSTAGRAM_TOP_MEDIA_CACHE_KEY, payload)

    return json(response, 200, {
      synced: true,
      scannedMedia: payload.scannedMedia,
      metricsRequested: payload.metricsRequested,
      metricsResolved: payload.metricsResolved,
      topMediaCount: topMedia.length,
      updatedAt: payload.updatedAt,
    })
  } catch (error) {
    return json(response, 500, {
      synced: false,
      error: error.message,
    })
  }
}
