import { AxiosResponse } from 'axios'

import { CompletePost, PostForm } from '@/@types/models/post'
import { api } from '@/lib/axios'

type TPostService = {
  getAll: () => Promise<CompletePost[] | []>
  getOne: (postId: string) => Promise<CompletePost>
  create: (data: PostForm) => Promise<CompletePost>
  update: (postId: string, data: PostForm) => Promise<CompletePost>
  delete: (postId: string) => Promise<void>
}

export const PostService: TPostService = {
  getAll: async () => {
    const response: AxiosResponse<CompletePost[] | []> = await api.get(
      '/post',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    return response.data || []
  },
  getOne: async (postId: string) => {
    const response: AxiosResponse<CompletePost> = await api.get(
      `/post/${postId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    return response.data
  },
  create: async (data: PostForm) => {
    const response: AxiosResponse<CompletePost> = await api.post(
      `/post`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )

    return response.data
  },
  update: async (postId: string, data: PostForm) => {
    const response: AxiosResponse<CompletePost> = await api.patch(
      `/post/${postId}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )

    return response.data
  },
  delete: async (postId: string) => {
    await api.delete(`/post/${postId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
}
