import { registerAs } from '@nestjs/config'
import { z } from 'zod'

// Validation schema
export const AppConfigValidationSchema = z.object({
  HOST: z.string().url(),
  PORT: z.number(),
})

export type AppConfigType = z.infer<typeof AppConfigValidationSchema>

// Config
export const app = registerAs(
  'app',
  (): AppConfigType => ({
    HOST: process.env.APP_HOST || '0.0.0.0',
    PORT: Number(process.env.APP_PORT) || 3000,
  }),
)
