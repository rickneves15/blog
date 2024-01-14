import { AxiosResponse } from 'axios'

import {
  ProfileEditServiceSchema,
  UserWithoutPassword,
} from '@/@types/models/user'
import { api } from '@/lib/axios'

type TAuth = {
  me: () => Promise<AxiosResponse<UserWithoutPassword>>
  edit: (
    data: Partial<UserWithoutPassword>,
  ) => Promise<AxiosResponse<UserWithoutPassword>>
}

export const UsersService: TAuth = {
  me: async (): Promise<AxiosResponse<UserWithoutPassword>> => {
    const response: AxiosResponse<UserWithoutPassword> = await api.get(
      '/users/me',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    return response
  },
  edit: async (
    data: Partial<UserWithoutPassword>,
  ): Promise<AxiosResponse<UserWithoutPassword>> => {
    const dataParsed = ProfileEditServiceSchema.parse(data)
    const response: AxiosResponse<UserWithoutPassword> = await api.post(
      '/users/edit',
      dataParsed,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    return response
  },
}
