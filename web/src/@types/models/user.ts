import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
})
export type User = z.infer<typeof UserSchema>

export const UserWithoutPasswordSchema = UserSchema.omit({ password: true })
export type UserWithoutPassword = z.infer<typeof UserWithoutPasswordSchema>

export const SignUpFormSchema = z
  .object({
    name: z.string().min(1, { message: 'Nome é necessário' }).trim(),
    email: z
      .string()
      .email({ message: 'Endereço de email invalido' })
      .min(1, { message: 'E-mail é necessário' })
      .trim(),
    password: z.string().min(1, { message: 'Senha é necessário' }).trim(),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'As senhas não coincidem',
    path: ['confirm_password'],
  })
export type SignUpForm = z.infer<typeof SignUpFormSchema>

export const SignUpFormWithoutConfirmPasswordSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
export type SignUpFormWithoutConfirmPassword = z.infer<
  typeof SignUpFormWithoutConfirmPasswordSchema
>

export const SignInFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Endereço de email invalido' })
    .min(1, { message: 'E-mail é necessário' })
    .trim(),
  password: z.string().min(1, { message: 'Senha é necessário' }).trim(),
})
export type SignInForm = z.infer<typeof SignInFormSchema>

export const ProfileEditServiceSchema = z.object({
  name: z.string().min(1, { message: 'Nome é necessário' }).trim(),
  email: z
    .string()
    .email({ message: 'Endereço de email invalido' })
    .min(1, { message: 'E-mail é necessário' })
    .trim(),
  password: z.string().trim().optional(),
})
export type ProfileEditService = z.infer<typeof ProfileEditServiceSchema>

export const ProfileEditFormSchema = z
  .object({
    name: z.string().min(1, { message: 'Nome é necessário' }).trim(),
    email: z
      .string()
      .email({ message: 'Endereço de email invalido' })
      .min(1, { message: 'E-mail é necessário' })
      .trim(),
    password: z.string().trim().optional(),
    confirm_password: z.string().optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'As senhas não coincidem',
    path: ['confirm_password'],
  })
export type ProfileEditForm = z.infer<typeof ProfileEditFormSchema>
