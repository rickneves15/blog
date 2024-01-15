import { z } from 'zod'

export const FileBaseSchema = z.object({
  url: z.string(),
})
export type FileBase = z.infer<typeof FileBaseSchema>
