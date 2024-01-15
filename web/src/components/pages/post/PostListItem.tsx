import Image from 'next/image'
import Link from 'next/link'

import { CompletePost } from '@/@types/models/post'

type PostListItemProps = {
  post: CompletePost
}

export function PostListItem({ post }: PostListItemProps) {
  return (
    <Link href={`/post/${post.id}`}>
      <article className="mx-auto flex max-w-[25rem] flex-col overflow-hidden rounded-xl shadow-xl shadow-black transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl">
        <div className="relative h-60">
          <Image
            src={post.file.url}
            alt="cover image"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="flex h-16 flex-col p-4">
          <h3 className=" line-clamp-2 h-16 text-2xl font-bold">
            {post.title}
          </h3>
        </div>
      </article>
    </Link>
  )
}
