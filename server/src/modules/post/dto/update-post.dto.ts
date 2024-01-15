import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const UpdatePostSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  userId: z.string(),
  fileId: z.string().optional(),
})

export class UpdatePostDto extends createZodDto(UpdatePostSchema) {}

export const UpdatePostBodySchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
})

export class UpdatePostBodyDto extends createZodDto(UpdatePostBodySchema) {}
