import { z } from 'zod'

import {
  AppConfigValidationSchema,
  PrismaConfigValidationSchema,
} from './configs'

export const configSchema = z.union([
  AppConfigValidationSchema,
  PrismaConfigValidationSchema,
])

export type ConfigType = z.infer<typeof configSchema>

export const ConfigValidate = (config: Record<string, unknown>) => {
  return configSchema.parse(config)
}
