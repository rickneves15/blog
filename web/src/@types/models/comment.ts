import { z } from 'zod'

import { UserWithoutPassword, UserWithoutPasswordSchema } from './user'

export const CommentBaseSchema = z.object({
  id: z.string(),
  description: z.string(),
})
export type CommentBase = z.infer<typeof CommentBaseSchema>

export interface CompleteComment extends z.infer<typeof CommentBaseSchema> {
  user: UserWithoutPassword
}

export const CompleteCommentSchema: z.ZodSchema<CompleteComment> = z.lazy(() =>
  CommentBaseSchema.extend({
    user: UserWithoutPasswordSchema,
  }),
)

export const NewCommentFormSchema = CommentBaseSchema.pick({
  description: true,
})
export type TNewCommentForm = z.infer<typeof NewCommentFormSchema>
