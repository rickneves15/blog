import { registerAs } from '@nestjs/config'
import process from 'node:process'
import { z } from 'zod'

export const RedisConfigValidationSchema = z.object({
  REDIS_HOST: z.string(),
  REDIS_PORT: z.number(),
  REDIS_TTL: z.number().min(1).nullable().optional(),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_KEY_PREFIX: z.string().optional(),
  REDIS_HTTP_CACHE_TTL: z.number().optional(),
  REDIS_MAX: z.number().optional(),
  REDIS_DISABLE_API_CACHE: z.boolean().nullable().optional(),
})

export type RedisConfigType = z.infer<typeof RedisConfigValidationSchema>

export const redis = registerAs(
  'redis',
  (): RedisConfigType => ({
    REDIS_HOST: process.env.REDIS_HOST || 'localhost',
    REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
    REDIS_TTL: Number(process.env.REDIS_TTL) || 0,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD || '',
    REDIS_KEY_PREFIX: process.env.REDIS_KEY_PREFIX
      ? `${process.env.REDIS_KEY_PREFIX}`
      : 'blog',
    REDIS_HTTP_CACHE_TTL: Number(process.env.REDIS_HTTP_CACHE_TTL) || 5,
    REDIS_MAX: Number(process.env.REDIS_MAX) || 5,
    REDIS_DISABLE_API_CACHE:
      Boolean(process.env.REDIS_DISABLE_API_CACHE) || null,
  }),
)
