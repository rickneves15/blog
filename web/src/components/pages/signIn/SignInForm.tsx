'use client'
import { Transition } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Separator } from '@radix-ui/react-separator'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { SignInForm, SignInFormSchema } from '@/@types/models/user'
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

export function SignInForm() {
  const { signIn, isLoading } = useAuth()
  const form = useForm({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: SignInForm) => signIn(data)

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
              <CardTitle className="text-2xl">Conectar-se</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
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
              <Button
                className="w-full mt-4"
                type="submit"
                disabled={isLoading}
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Entrar
              </Button>

              <Separator className="shrink-0 bg-border h-[1px] w-full my-4" />

              <div className="relative flex justify-center text-xs uppercase">
                <Link
                  href={'/sign-up'}
                  className="px-2 text-gray-500 hover:text-gray-900"
                >
                  Or registre-se
                </Link>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </Transition>
  )
}
