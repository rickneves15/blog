import { CommentModel } from '@/shared/models'
import { createZodDto } from 'nestjs-zod'

export const CreateCommentSchema = CommentModel.pick({
  description: true,
  userId: true,
  postId: true,
})

export class CreateCommentDto extends createZodDto(CreateCommentSchema) {}

export const CreateCommentRequestSchema = CommentModel.pick({
  description: true,
  postId: true,
})

export class CreateCommentRequestDto extends createZodDto(
  CreateCommentRequestSchema,
) {}
