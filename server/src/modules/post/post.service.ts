import { PrismaService } from '@/lib/database/prisma.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePostDto) {
    return await this.prisma.post.create({
      data,
      include: { user: true, file: true },
    })
  }

  async findAll() {
    return await this.prisma.post.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        vizualizations: true,
        likes: true,
        unlikes: true,
        fileId: true,
        userId: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        file: {
          select: {
            url: true,
          },
        },
      },
    })
  }

  async findById(id: string) {
    const post = await this.prisma.post.findFirst({
      select: {
        id: true,
        title: true,
        description: true,
        vizualizations: true,
        likes: true,
        unlikes: true,
        fileId: true,
        userId: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        file: {
          select: {
            url: true,
          },
        },
        Comment: {
          where: {
            isDeleted: false,
          },
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
        },
      },
      where: {
        id,
      },
    })

    if (!post) {
      throw new BadRequestException('Post is not found')
    }

    return post!
  }

  async update(userId: string, id: string, data: UpdatePostDto) {
    if (!(await this.isPostBelongsToUser(userId, id))) {
      throw new BadRequestException('Post does not belong to user')
    }

    return await this.prisma.post.update({
      where: {
        id,
      },
      data,
      include: { user: true, file: true },
    })
  }

  async remove(userId: string, id: string) {
    if (!(await this.isPostBelongsToUser(userId, id))) {
      throw new BadRequestException('Post does not belong to user')
    }

    return await this.prisma.post.delete({
      where: {
        id,
      },
    })
  }

  async isPostBelongsToUser(userId: string, postId: string): Promise<boolean> {
    const post = await this.findById(postId)

    if (post.userId !== userId) {
      return false
    }

    return true
  }

  async report() {
    return await this.prisma.post.findMany({
      select: {
        title: true,
        description: true,
        _count: {
          select: { Comment: true },
        },
      },
    })
  }
}
