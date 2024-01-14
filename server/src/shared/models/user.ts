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

export type User = z.infer<typeof userModel>

export class UserDto extends createZodDto(userModel) {}
