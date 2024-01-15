'use client'
import { Transition } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  ProfileEditForm,
  ProfileEditFormSchema,
  UserWithoutPasswordSchema,
} from '@/@types/models/user'
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
import { Icons } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/auth'
import { UsersService } from '@/services/userService'

export function ProfileEditForm() {
  const { user, setUser, isLoading } = useAuth()
  const form = useForm({
    resolver: zodResolver(ProfileEditFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
  })
  useEffect(() => {
    form.setValue('name', user?.name)
    form.setValue('email', user?.email)
  }, [user])

  const onSubmit = async (data: ProfileEditForm) => {
    const response = await UsersService.edit(data)

    toast.success('Perfil editado com sucesso.', {
      duration: 1500,
      onAutoClose: () => {
        setUser(UserWithoutPasswordSchema.parse(response.data))
        form.reset({
          name: response.data.name,
          email: response.data.email,
          password: '',
          confirm_password: '',
        })
      },
    })
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
              <CardTitle className="text-2xl">Perfil</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmação de Senha</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full mt-4"
                type="submit"
                disabled={isLoading}
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Salvar
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>
    </Transition>
  )
}
