import { Dialog, Transition } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, Fragment, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  CompleteComment,
  NewCommentFormSchema,
  TNewCommentForm,
} from '@/@types/models/comment'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { CommentService } from '@/services/commentService'

type DialogEditCommentForm = {
  comment: CompleteComment
  postId: string
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function DialogEditCommentForm({
  comment,
  postId,
  isOpen,
  setIsOpen,
}: DialogEditCommentForm) {
  const form = useForm({
    resolver: zodResolver(NewCommentFormSchema),
    defaultValues: {
      description: comment.description,
    },
  })

  const onDialogEditCommentSubmit = async (data: TNewCommentForm) => {
    try {
      await CommentService.update(postId, comment.id, data)
      toast.success('Comentario adicionado com sucesso.', {
        duration: 1000,
        onAutoClose: () => {
          setIsOpen(false)
          form.reset()
        },
      })
      form.reset()
    } catch (error) {
      toast.error('Houve um erro. Tente novamente mais tarde.', {
        duration: 1500,
      })
    }
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Editar Comentário
                </Dialog.Title>
                <form
                  onSubmit={form.handleSubmit(onDialogEditCommentSubmit)}
                  className="flex flex-col w-full"
                >
                  <div className="space-y-2">
                    <Textarea
                      className="resize-none text-primary"
                      {...form.register('description')}
                    />

                    {form.formState.errors.description && (
                      <p className="text-[0.8rem] font-medium text-destructive">
                        {form.formState.errors.description.message}
                      </p>
                    )}
                  </div>

                  <Button
                    className="w-full mt-4 bg-primary text-primary-foreground"
                    type="submit"
                    size="sm"
                  >
                    Comentar
                  </Button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
