import { CommentModel } from '@/shared/models'
import { createZodDto } from 'nestjs-zod'

export const UpdateCommentSchema = CommentModel.pick({
  description: true,
})

export class UpdateCommentDto extends createZodDto(UpdateCommentSchema) {}
