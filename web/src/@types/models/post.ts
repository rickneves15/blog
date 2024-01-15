import { z } from 'zod'

import { CompleteComment, CompleteCommentSchema } from './comment'
import { FileBase, FileBaseSchema } from './file'
import { UserWithoutPassword, UserWithoutPasswordSchema } from './user'

export const PostBase = z.object({
  id: z.string(),
  title: z
    .string()
    .min(4, { message: 'Descricão deve ter pelo menos 4 caracteres' })
    .max(50, { message: 'Descricão deve ter no maximo 50 caracteres' }),
  description: z
    .string()
    .min(4, { message: 'Descricão deve ter pelo menos 4 caracteres' })
    .max(100, { message: 'Descricão deve ter no maximo 100 caracteres' }),
  vizualizations: z.number().int().nullish(),
  unlikes: z.number().int().nullish(),
  likes: z.number().int().nullish(),
  userId: z.string(),
  fileId: z.string(),
})
export type PostBase = z.infer<typeof PostBase>

export interface CompletePost extends z.infer<typeof PostBase> {
  user: UserWithoutPassword
  file: FileBase
  Comment: CompleteComment[]
}

export const CompletePostSchema: z.ZodSchema<CompletePost> = z.lazy(() =>
  PostBase.extend({
    user: UserWithoutPasswordSchema,
    file: FileBaseSchema,
    Comment: z.array(CompleteCommentSchema),
  }),
)

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

export const PostFormSchema = z.object({
  title: z
    .string()
    .min(4, { message: 'Descricão deve ter pelo menos 4 caracteres' })
    .max(50, { message: 'Descricão deve ter no maximo 50 caracteres' }),
  description: z
    .string()
    .min(4, { message: 'Descricão deve ter pelo menos 4 caracteres' })
    .max(100, { message: 'Descricão deve ter no maximo 100 caracteres' }),
  file: z
    .any()
    .optional()
    .refine((files) => {
      if (files.length > 0) {
        const file = files[0]
        return ACCEPTED_IMAGE_TYPES.includes(file.type)
      }
      return true
    }, 'Apenas os formatos .jpg, .jpeg e .png são suportados.'),
})
export type PostForm = z.infer<typeof PostFormSchema>
