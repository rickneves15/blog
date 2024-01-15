import { PrismaService } from '@/lib/database/prisma.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCommentDto) {
    return await this.prisma.comment.create({
      data,
      select: {
        id: true,
        description: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })
  }

  async update(userId: string, id: string, data: UpdateCommentDto) {
    if (!(await this.isCommentBelongsToUserOrUserPost(userId, id))) {
      throw new BadRequestException('Comment does not belong to user')
    }

    return await this.prisma.comment.update({
      where: {
        id,
      },
      data,
    })
  }

  async remove(userId: string, id: string) {
    if (!(await this.isCommentBelongsToUserOrUserPost(userId, id, true))) {
      throw new BadRequestException('Comment does not belong to user')
    }

    await this.prisma.comment.update({
      data: {
        isDeleted: true,
      },
      where: {
        id,
      },
    })
  }

  async isCommentBelongsToUserOrUserPost(
    userId: string,
    commentId: string,
    isUserPost: boolean = false,
  ): Promise<boolean> {
    const comment = await this.prisma.comment.findFirst({
      where: { id: commentId },
      include: {
        post: {
          select: {
            user: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    })

    if (!comment) {
      throw new BadRequestException('Comment is not found')
    }

    if (isUserPost) {
      if (comment.post.user.id === userId) {
        console.log(userId)
        console.log(comment.post.user.id)
        return true
      }
    }

    if (comment.userId !== userId) {
      return false
    }

    return true
  }
}
