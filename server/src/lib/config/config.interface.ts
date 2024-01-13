import { z } from 'zod'

import {
  AppConfigValidationSchema,
  JWTConfigValidationSchema,
  PrismaConfigValidationSchema,
  RedisConfigValidationSchema,
} from './configs'

export const configSchema = z.union([
  AppConfigValidationSchema,
  JWTConfigValidationSchema,
  PrismaConfigValidationSchema,
  RedisConfigValidationSchema,
])

export type ConfigType = z.infer<typeof configSchema>

export const ConfigValidate = (config: Record<string, unknown>) => {
  return configSchema.parse(config)
}
