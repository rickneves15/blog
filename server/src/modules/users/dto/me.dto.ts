import { userModel } from '@/shared/models'
import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const MeSchema = userModel.omit({ password: true })

export type UserWithoutPassword = z.infer<typeof MeSchema>

export class MeDto extends createZodDto(MeSchema) {}
