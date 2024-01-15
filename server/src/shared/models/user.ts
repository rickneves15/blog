import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"
import { CompletePost, RelatedPostModel } from "./index"

export const userModel = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export class userDto extends createZodDto(userModel) {
}

export interface Completeuser extends z.infer<typeof userModel> {
  Post: CompletePost[]
}

/**
 * RelateduserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelateduserModel: z.ZodSchema<Completeuser> = z.lazy(() => userModel.extend({
  Post: RelatedPostModel.array(),
}))
