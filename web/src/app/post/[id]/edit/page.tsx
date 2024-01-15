import { Container } from '@/components/Container'
import { PostForm } from '@/components/pages/post/PostForm'

export default function Post({ params }: { params: { id: string } }) {
  return (
    <Container>
      <PostForm postId={params.id} />
    </Container>
  )
}
