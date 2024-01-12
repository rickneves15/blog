import { registerAs } from '@nestjs/config'
import { z } from 'zod'

// Validation schema
export const PrismaConfigValidationSchema = z.object({
  DATABASE_URL: z.string().optional(),
})

export type PrismaConfigType = z.infer<typeof PrismaConfigValidationSchema>

// Prisma
export const prisma = registerAs(
  'prisma',
  (): PrismaConfigType => ({
    DATABASE_URL: process.env.DATABASE_URL || 'file:./dev.db',
  }),
)
