import { createZodDto } from 'nestjs-zod/dto'
import * as z from 'nestjs-zod/z'

export const fileModel = z.object({
  id: z.string(),
  name: z.string(),
  contentLength: z.number().int(),
  contentType: z.string(),
  url: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export class fileDto extends createZodDto(fileModel) {}
