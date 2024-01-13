import { registerAs } from '@nestjs/config'
import { z } from 'zod'

export const JWTConfigValidationSchema = z.object({
  SECRET_KEY: z.string(),
  ACCESS_TOKEN_TTL: z.number().optional(),
})

export type JWTConfigType = z.infer<typeof JWTConfigValidationSchema>

export const jwtConfig: JWTConfigType = {
  SECRET_KEY: process.env.JWT_SECRET || 'your-secret',
  ACCESS_TOKEN_TTL: Number(process.env.JWT_ACCESS_TOKEN_TTL) || 3600,
}

export const jwt = registerAs('jwt', (): JWTConfigType => jwtConfig)
