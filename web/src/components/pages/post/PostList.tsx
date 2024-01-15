'use client'
import { useQuery } from 'react-query'

import { CompletePost } from '@/@types/models/post'
import { PostService } from '@/services/postService'

import { PostListItem } from './PostListItem'

export function PostList() {
  const { data } = useQuery<CompletePost[], Error>('posts', PostService.getAll)

  return (
    <section className="flex scroll-mt-12 flex-col items-center space-y-16">
      <div className="grid w-full grid-cols-1 gap-x-8 gap-y-32 md:grid-cols-2 xl:grid-cols-3">
        {data &&
          data?.map((post) => <PostListItem key={post.id} post={post} />)}
      </div>
    </section>
  )
}
