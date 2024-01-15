import { CompleteComment } from '@/@types/models/comment'

import { CommentItem } from './CommentItem'

type CommentsListProps = {
  comments: CompleteComment[]
  postId: string
}

export function CommentsList({ comments, postId }: CommentsListProps) {
  return (
    <section className="flex flex-col w-full mt-10 space-y-10">
      {comments.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold">Comentários</h2>
          {comments.map((comment) => (
            <div key={comment.id}>
              <CommentItem comment={comment} postId={postId} />
            </div>
          ))}
        </>
      ) : (
        <span className="text-center text-2xl font-bold">Sem comentários</span>
      )}
    </section>
  )
}
