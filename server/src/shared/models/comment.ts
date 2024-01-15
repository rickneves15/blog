import { createZodDto } from 'nestjs-zod/dto'
import * as z from 'nestjs-zod/z'
import {
  CompletePost,
  Completeuser,
  RelatedPostModel,
  RelateduserModel,
} from './index'

export const CommentModel = z.object({
  id: z.string(),
  description: z.string(),
  isDeleted: z.boolean().nullish(),
  userId: z.string(),
  postId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export class CommentDto extends createZodDto(CommentModel) {}

export interface CompleteComment extends z.infer<typeof CommentModel> {
  user: Completeuser
  post: CompletePost
}

/**
 * RelatedCommentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCommentModel: z.ZodSchema<CompleteComment> = z.lazy(() =>
  CommentModel.extend({
    user: RelateduserModel,
    post: RelatedPostModel,
  }),
)
