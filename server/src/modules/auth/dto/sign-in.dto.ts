import { userModel } from '@/shared/models'
import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const SignInSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export class SignInDto extends createZodDto(SignInSchema) {}

export const SignInResponseSchema = userModel.omit({ password: true })

export class SignInResponseDto extends createZodDto(SignInResponseSchema) {}
