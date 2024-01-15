import { Container } from '@/components/Container'
import { PostDetail } from '@/components/pages/post/PostDetail'

export default function Post({ params }: { params: { id: string } }) {
  return (
    <Container>
      <PostDetail postId={params.id} />
    </Container>
  )
}
