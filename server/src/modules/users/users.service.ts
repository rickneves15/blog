import { BcryptService } from '@/lib/bcrypt/bcrypt.service'
import { PrismaService } from '@/lib/database/prisma.service'
import { UserDto } from '@/shared/models'
import { BadRequestException, Injectable } from '@nestjs/common'
import { UserWithoutPassword } from './dto/me.dto'
import { UserEditDto } from './dto/user-edit'

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcryptService: BcryptService,
  ) {}

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

  async edit(
    userId: string,
    data: Partial<UserEditDto>,
  ): Promise<UserWithoutPassword> {
    const user = await this.findById(userId)

    if (!user) {
      throw new BadRequestException('User is not found')
    }

    if (data.password) {
      const passwordHash = await this.bcryptService.hash(data.password)
      data.password = passwordHash
    }

    const userUpdated = await this.prisma.user.update({
      data,
      where: { id: userId },
    })

    return userUpdated
  }
}
