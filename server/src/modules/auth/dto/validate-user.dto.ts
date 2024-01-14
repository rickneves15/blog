import { userModel } from '@/shared/models'
import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const ValidationUserSchema = userModel.extend({
  accessToken: z.string(),
})

export class ValidationUserDto extends createZodDto(ValidationUserSchema) {}
