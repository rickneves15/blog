import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

const SignUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

export class SignUpDto extends createZodDto(SignUpSchema) {}
