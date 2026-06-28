/* global process */

import { getEnvInstagramToken, getStoredInstagramToken, setStoredInstagramToken } from './_instagram-cache.js'

const GRAPH_API_VERSION = 'v25.0'
const GRAPH_API_BASE_URL = `https://graph.facebook.com/${GRAPH_API_VERSION}`
const REFRESH_WINDOW_DAYS = 14

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

const metaRequest = async (path, params) => {
  const url = new URL(`${GRAPH_API_BASE_URL}${path}`)
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value)
  })

  const response = await fetch(url)
  const payload = await response.json()

  if (!response.ok || payload.error) {
    throw new Error(payload.error?.message || `Meta request failed with ${response.status}`)
  }

  return payload
}

const getTokenDebugInfo = async (accessToken) => {
  const appId = process.env.META_APP_ID
  const appSecret = process.env.META_APP_SECRET

  if (!appId || !appSecret) return null

  const payload = await metaRequest('/debug_token', {
    input_token: accessToken,
    access_token: `${appId}|${appSecret}`,
  })

  return payload.data || null
}

const shouldRefreshToken = (debugInfo) => {
  if (!debugInfo?.expires_at) return true

  const expiresAtMs = debugInfo.expires_at * 1000
  const refreshWindowMs = REFRESH_WINDOW_DAYS * 24 * 60 * 60 * 1000

  return expiresAtMs - Date.now() <= refreshWindowMs
}

const exchangeLongLivedToken = async (accessToken) => {
  const appId = process.env.META_APP_ID
  const appSecret = process.env.META_APP_SECRET

  if (!appId || !appSecret) {
    throw new Error('META_APP_ID and META_APP_SECRET are required to refresh the token')
  }

  return metaRequest('/oauth/access_token', {
    grant_type: 'fb_exchange_token',
    client_id: appId,
    client_secret: appSecret,
    fb_exchange_token: accessToken,
  })
}

export default async function handler(request, response) {
  if (request.method !== 'GET' && request.method !== 'POST') {
    response.setHeader('Allow', 'GET, POST')
    return json(response, 405, { error: 'Method not allowed' })
  }

  if (!isAuthorized(request)) {
    return json(response, 401, { error: 'Unauthorized' })
  }

  try {
    const currentToken = await getStoredInstagramToken()
    const envToken = getEnvInstagramToken()

    if (!currentToken) {
      return json(response, 503, {
        refreshed: false,
        error: 'INSTAGRAM_ACCESS_TOKEN is not configured',
      })
    }

    const candidates = [...new Set([currentToken, envToken].filter(Boolean))]
    let lastError = null

    for (const candidateToken of candidates) {
      try {
        const beforeDebugInfo = await getTokenDebugInfo(candidateToken)

        if (beforeDebugInfo && !shouldRefreshToken(beforeDebugInfo)) {
          await setStoredInstagramToken({
            accessToken: candidateToken,
            source: candidateToken === envToken ? 'env-valid-token' : 'stored-valid-token',
            lastValidatedAt: new Date().toISOString(),
            expiresAt: beforeDebugInfo.expires_at ? new Date(beforeDebugInfo.expires_at * 1000).toISOString() : null,
          })

          return json(response, 200, {
            refreshed: false,
            reason: 'Token is not close to expiration',
            expiresAt: beforeDebugInfo.expires_at ? new Date(beforeDebugInfo.expires_at * 1000).toISOString() : null,
          })
        }

        const exchange = await exchangeLongLivedToken(candidateToken)
        const nextToken = exchange.access_token

        if (!nextToken) {
          throw new Error('Meta did not return a refreshed access token')
        }

        const expiresAt = exchange.expires_in
          ? new Date(Date.now() + exchange.expires_in * 1000).toISOString()
          : null

        await setStoredInstagramToken({
          accessToken: nextToken,
          source: 'refresh-cron',
          refreshedAt: new Date().toISOString(),
          expiresAt,
          expiresIn: exchange.expires_in || null,
        })

        return json(response, 200, {
          refreshed: true,
          expiresAt,
        })
      } catch (error) {
        lastError = error
      }
    }

    throw lastError || new Error('No usable token candidate was found')
  } catch (error) {
    return json(response, 500, {
      refreshed: false,
      error: error.message,
    })
  }
}
