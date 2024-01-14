import { PrismaService } from '@/lib/database/prisma.service'
import { UserDto } from '@/shared/models'
import { BadRequestException, Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<UserDto> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (!user) {
      throw new BadRequestException('User is not found')
    }

    return user
  }

  async findById(id: string): Promise<UserDto> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    })

    if (!user) {
      throw new BadRequestException('User is not found')
    }

    return user!
  }
}
