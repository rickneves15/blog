import { AxiosResponse } from 'axios'

import {
  SignInForm,
  SignUpForm,
  SignUpFormWithoutConfirmPasswordSchema,
} from '@/@types/models/user'
import { TSignInResponse } from '@/@types/services/auth'
import { api } from '@/lib/axios'

type TAuth = {
  signIn: (data: SignInForm) => Promise<AxiosResponse<TSignInResponse>>
  signUp: (data: SignUpForm) => Promise<AxiosResponse<void>>
  signOut: () => Promise<void>
}

export const AuthService: TAuth = {
  signIn: async (data: SignInForm): Promise<AxiosResponse<TSignInResponse>> => {
    const response: AxiosResponse<TSignInResponse> = await api.post(
      '/auth/sign-in',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    return response
  },
  signUp: async (data: SignUpForm): Promise<AxiosResponse<void>> => {
    const dataParsed = SignUpFormWithoutConfirmPasswordSchema.parse(data)

    const response = await api.post('/auth/sign-up', dataParsed, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response
  },
  signOut: async (): Promise<void> => {
    await api.post('/auth/sign-out', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
}
