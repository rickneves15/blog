import { createZodDto } from 'nestjs-zod/dto'
import * as z from 'nestjs-zod/z'

export const userModel = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export class userDto extends createZodDto(userModel) {}
