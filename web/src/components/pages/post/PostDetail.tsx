'use client'

import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'
import { useQuery } from 'react-query'
import { toast } from 'sonner'

import { CompletePost } from '@/@types/models/post'
import { Icons } from '@/components/ui/icons'
import { useAuth } from '@/hooks/auth'
import { PostService } from '@/services/postService'

import { CommentsList } from './Comment/CommentsList'
import { NewCommentForm } from './Comment/NewCommentForm'

type PostDetailProps = {
  postId: string
}

export function PostDetail({ postId }: PostDetailProps) {
  const router = useRouter()
  const { isLogged } = useAuth()
  const { data, isLoading, error } = useQuery<CompletePost, Error>({
    queryKey: ['post', postId],
    queryFn: async () => {
      return await PostService.getOne(postId)
    },
  })

  const handleEdit = async () => {
    router.push(`/post/${postId}/edit`)
  }

  const handleDelete = async () => {
    try {
      await PostService.delete(postId)
      toast.success('Post deletado com sucesso. Redirecionando...', {
        duration: 1500,
        onAutoClose: () => router.push('/'),
      })
    } catch (error) {
      toast.error('Houve um erro. Tente novamente mais tarde.', {
        duration: 1500,
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex mt-[25%] justify-center items-center">
        <Icons.spinner className="mr-2 h-12 w-12 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto mt-40 text-center">
        <h2 className="mb-4 text-3xl font-bold">Post não encontrado</h2>
        <Link href="/">
          <span className="mr-2">&larr;</span>
          <span>Ir para à pagina de postagens</span>
        </Link>
      </div>
    )
  }

  if (data) {
    return (
      <article className="mt-4 flex flex-col items-center md:mt-20">
        <div className="relative aspect-[3/2] w-[90vw] max-w-[900px]">
          <Image
            src={data.file.url}
            alt="cover"
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className="flex flex-col w-full max-w-[720px] mb-10 gap-y-5">
          <div className="flex w-full justify-between items-center">
            <h1 className="text-3xl font-bold flex-1">{data.title}</h1>
            {isLogged && (
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black/20 px-3 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
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
                  <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
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
                          <TrashIcon
                            className="mr-2 h-5 w-5 "
                            aria-hidden="true"
                          />
                          Exluir
                        </button>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
          </div>
          <p className="text-lg break-all whitespace-pre-wrap">
            {data.description}
          </p>

          <div className="mx-10">
            <NewCommentForm postId={data.id} />
            <CommentsList comments={data.Comment} postId={data.id} />
          </div>
        </div>
      </article>
    )
  }

  return null
}
