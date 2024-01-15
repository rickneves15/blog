'use client'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { AxiosError } from 'axios'
import { Fragment, useState } from 'react'
import { toast } from 'sonner'

import { CompleteComment } from '@/@types/models/comment'
import { ErrorApi } from '@/@types/services'
import { useAuth } from '@/hooks/auth'
import { CommentService } from '@/services/commentService'

import { DialogEditCommentForm } from './DialogEditCommentForm'

type CommentItemProps = {
  comment: CompleteComment
  postId: string
}

export function CommentItem({ comment, postId }: CommentItemProps) {
  const { isLogged } = useAuth()
  const [isOpen, setIsOpen] = useState<boolean>(false as boolean)

  const handleEdit = async () => {
    setIsOpen(true)
  }

  const handleDelete = async () => {
    try {
      await CommentService.delete(comment.id)
      toast.success('Post deletado com sucesso. Redirecionando...', {
        duration: 1500,
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        const responseError = error.response?.data as AxiosError<ErrorApi>
        if (responseError.message === 'Comment does not belong to user') {
          toast.error('Comentário não pertence ao usuário.', {
            duration: 1500,
          })
        } else {
          toast.error(
            'Não foi possível excluir o comentário. Tente novamente...',
            {
              duration: 1500,
            },
          )
        }
      }
      console.log(error)
      toast.error('Houve um erro. Tente novamente mais tarde.', {
        duration: 1500,
      })
    }
  }

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex space-x-2">
        <p className="font-bold">{comment.user.name}</p>
        {isLogged && (
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black/20 p-1 text-xs font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                <ChevronDownIcon className="w-3 h-3" />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-10">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    <button
                      onClick={handleEdit}
                      className="text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm"
                    >
                      <Pencil1Icon
                        className="mr-2 h-5 w-5 "
                        aria-hidden="true"
                      />
                      Editar
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={handleDelete}
                      className="text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm"
                    >
                      <TrashIcon className="mr-2 h-5 w-5 " aria-hidden="true" />
                      Exluir
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        )}
      </div>
      <DialogEditCommentForm
        postId={postId}
        comment={comment}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <p className="text-sm">{comment.description}</p>
    </div>
  )
}
