import { PostModel } from '@/shared/models'
import { createZodDto } from 'nestjs-zod'

export const CreatePostSchema = PostModel.pick({
  title: true,
  description: true,
  fileId: true,
  userId: true,
})

export class CreatePostDto extends createZodDto(CreatePostSchema) {}

export const CreatePostBodySchema = PostModel.pick({
  title: true,
  description: true,
})

export class CreatePostBodyDto extends createZodDto(CreatePostBodySchema) {}
