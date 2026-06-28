/* global process */

import { Redis } from '@upstash/redis'

export const INSTAGRAM_STATS_CACHE_KEY = 'instagram:last-good-response'
export const INSTAGRAM_TOKEN_CACHE_KEY = 'instagram:access-token'

export const redis = process.env.UPSTASH_REDIS_KV_REST_API_URL && process.env.UPSTASH_REDIS_KV_REST_API_TOKEN
  ? new Redis({
    url: process.env.UPSTASH_REDIS_KV_REST_API_URL,
    token: process.env.UPSTASH_REDIS_KV_REST_API_TOKEN,
  })
  : null

export const getCache = async (key) => {
  if (!redis) return null

  try {
    return await redis.get(key)
  } catch {
    return null
  }
}

export const setCache = async (key, payload) => {
  if (!redis) return false

  try {
    await redis.set(key, payload)
    return true
  } catch {
    return false
  }
}

export const getStoredInstagramToken = async () => {
  const tokenRecord = await getCache(INSTAGRAM_TOKEN_CACHE_KEY)
  return tokenRecord?.accessToken || process.env.INSTAGRAM_ACCESS_TOKEN || ''
}

export const getEnvInstagramToken = () => process.env.INSTAGRAM_ACCESS_TOKEN || ''

export const setStoredInstagramToken = async (tokenRecord) => {
  return setCache(INSTAGRAM_TOKEN_CACHE_KEY, tokenRecord)
}
