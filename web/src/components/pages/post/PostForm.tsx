'use client'
import { Transition } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { PostFormSchema, PostForm as TPostForm } from '@/@types/models/post'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PostService } from '@/services/postService'

type PostFormProps = {
  postId?: string | null
}

export function PostForm({ postId = null }: PostFormProps) {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(PostFormSchema),
    defaultValues: {
      title: '',
      description: '',
      file: '',
    },
  })

  const getPost = async () => {
    if (postId) {
      const data = await PostService.getOne(postId)
      form.setValue('title', data.title)
      form.setValue('description', data.description)
    }
  }

  useEffect(() => {
    getPost()
  }, [])

  const onSubmit = (data: TPostForm) => {
    try {
      if (postId) {
        PostService.update(postId, data)
        toast.success('Post editado com sucesso. Redirecionando...', {
          duration: 1500,
          onAutoClose: () => router.push(`/post/${postId}`),
        })
      } else {
        PostService.create(data)
        toast.success('Post creaido com sucesso. Redirecionando...', {
          duration: 1500,
          onAutoClose: () => router.push('/'),
        })
      }
    } catch (error) {
      toast.error('Houve um erro. Tente novamente mais tarde.', {
        duration: 1500,
      })
    }
  }

  return (
    <Transition
      className="flex justify-center items-center"
      appear={true}
      show={true}
      enter="transition-all ease-in-out duration-500 delay-[200ms]"
      enterFrom="opacity-0 translate-y-6"
      enterTo="opacity-100 translate-y-0"
      leave="transition-all ease-in-out duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-[350px]">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">
                {postId ? 'Editar Post' : 'Criar Post'}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  {...form.register('file')}
                />

                {form.formState.errors.file && (
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {form.formState.errors.file.message}
                  </p>
                )}
              </div>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <Textarea className="resize-none" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full mt-4" type="submit">
                {postId ? 'Editar' : 'Criar'}
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>
    </Transition>
  )
}

