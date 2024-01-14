import { userModel } from '@/shared/models'
import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const UserEditSchema = userModel.pick({
  name: true,
  email: true,
  password: true,
})
export type UserEdit = z.infer<typeof UserEditSchema>
export class UserEditDto extends createZodDto(UserEditSchema) {}

export const UserEditResponseSchema = userModel.omit({ password: true })
export class UserEditResponseDto extends createZodDto(UserEditResponseSchema) {}
