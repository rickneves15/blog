import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"
import { CompletePost, RelatedPostModel } from "./index"

export const fileModel = z.object({
  id: z.string(),
  name: z.string(),
  contentLength: z.number().int(),
  contentType: z.string(),
  url: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export class fileDto extends createZodDto(fileModel) {
}

export interface Completefile extends z.infer<typeof fileModel> {
  Post: CompletePost[]
}

/**
 * RelatedfileModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedfileModel: z.ZodSchema<Completefile> = z.lazy(() => fileModel.extend({
  Post: RelatedPostModel.array(),
}))
