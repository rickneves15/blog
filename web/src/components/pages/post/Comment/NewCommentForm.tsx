'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { NewCommentFormSchema, TNewCommentForm } from '@/@types/models/comment'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { CommentService } from '@/services/commentService'

type NewCommentFormProps = {
  postId: string
}

export function NewCommentForm({ postId }: NewCommentFormProps) {
  // const router = useRouter()
  const form = useForm({
    resolver: zodResolver(NewCommentFormSchema),
    defaultValues: {
      description: '',
    },
  })

  const onSubmit = async (data: TNewCommentForm) => {
    try {
      await CommentService.create(postId, data)
      toast.success('Comentario adicionado com sucesso.', {
        duration: 1000,
      })
      form.reset()
    } catch (error) {
      toast.error('Houve um erro. Tente novamente mais tarde.', {
        duration: 1500,
      })
    }
  }

  return (
    <div className="flex justify-center items-center">
      <Form {...form}>
        <form
          key={2}
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full"
        >
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Descrição</FormLabel>
                <Textarea className="resize-none" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              className=" mt-4"
              type="submit"
              variant="secondary"
              size="sm"
            >
              Comentar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
