import { AxiosResponse } from 'axios'

import { UserWithoutPassword } from '@/@types/models/user'
import { api } from '@/lib/axios'

type TAuth = {
  me: () => Promise<AxiosResponse<UserWithoutPassword>>
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
}
