import { BcryptService } from '@/lib/bcrypt/bcrypt.service'
import { PrismaService } from '@/lib/database/prisma.service'
import { userDto } from '@/shared/models'
import { BadRequestException, Injectable } from '@nestjs/common'
import { UserEditDto, UserEditResponseDto } from './dto/user-edit'

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcryptService: BcryptService,
  ) {}

  async findByEmail(email: string): Promise<userDto> {
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

  async findById(id: string): Promise<userDto> {
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
  ): Promise<UserEditResponseDto> {
    const userUpdated: Partial<UserEditDto> = {
      name: data.name,
      email: data.email,
    }
    const user = await this.findById(userId)

    if (!user) {
      throw new BadRequestException('User is not found')
    }

    if (data.password) {
      const passwordHash = await this.bcryptService.hash(data.password)
      userUpdated.password = passwordHash
    }

    return await this.prisma.user.update({
      data: userUpdated,
      where: { id: userId },
    })
  }
}
