import { AxiosResponse } from 'axios'

import { CompleteComment, TNewCommentForm } from '@/@types/models/comment'
import { api } from '@/lib/axios'

type TCommentService = {
  create: (
    postId: string,
    data: TNewCommentForm,
  ) => Promise<AxiosResponse<CompleteComment>>
  update: (
    postId: string,
    commentId: string,
    data: TNewCommentForm,
  ) => Promise<AxiosResponse<CompleteComment>>
  delete: (commentId: string) => Promise<void>
}

export const CommentService: TCommentService = {
  create: async (postId: string, data: TNewCommentForm) => {
    const response: AxiosResponse<CompleteComment> = await api.post(
      `/comment`,
      {
        ...data,
        postId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    return response
  },
  update: async (postId: string, commentId: string, data: TNewCommentForm) => {
    const response: AxiosResponse<CompleteComment> = await api.patch(
      `/comment/${commentId}`,
      {
        ...data,
        postId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    return response
  },
  delete: async (commentId: string) => {
    await api.delete(`/comment/${commentId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
}
