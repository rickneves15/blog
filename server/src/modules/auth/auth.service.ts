import { BadRequestException, Injectable } from '@nestjs/common'

import { BcryptService } from '@/lib/bcrypt/bcrypt.service'
import { CacheService } from '@/lib/cache/cache.service'
import { PrismaService } from '@/lib/database/prisma.service'
import { JwtPayload } from '@/shared/@types/types/jwt'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { SignInDto, SignInResponseSchema } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'
import { ValidationUserDto } from './dto/validate-user.dto'

@Injectable()
export class AuthService {
  private REDIS_KEY_PREFIX

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    private readonly cacheService: CacheService,
    private readonly usersService: UsersService,
  ) {
    this.REDIS_KEY_PREFIX = this.configService.get('redis.REDIS_KEY_PREFIX')
  }

  async validateUser(payload: JwtPayload): Promise<ValidationUserDto> {
    const {
      user: { id },
    } = payload
    const user = await this.usersService.findById(id)

    const accessToken = await this.cacheService.get<string>(
      `${this.REDIS_KEY_PREFIX}:user-${user.id}`,
    )

    if (!user || !accessToken) {
      throw new BadRequestException('User not found')
    }

    return { ...user, accessToken }
  }

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const isExist = await this.prisma.user.findFirst({
      where: {
        email: signUpDto.email,
      },
    })

    if (isExist) {
      throw new BadRequestException('User already exists')
    }

    const password = await this.bcryptService.hash(signUpDto.password)

    await this.prisma.user.create({
      data: {
        ...signUpDto,
        password,
      },
    })
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: signInDto.email,
      },
    })

    if (!user) {
      throw new BadRequestException('User not found')
    }

    const isPasswordMatch = await this.bcryptService.compare(
      signInDto.password,
      user.password,
    )

    if (!user || !isPasswordMatch) {
      throw new BadRequestException('Invalid credentials')
    }

    const data = SignInResponseSchema.parse(user)
    const payload = { user: data, sub: user.id }
    const accessToken = await this.jwtService.signAsync(payload)

    await this.cacheService.set(
      `${this.REDIS_KEY_PREFIX}:user-${user.id}`,
      accessToken,
    )

    return {
      accessToken,
    }
  }

  async signOut(userId: string): Promise<void> {
    await this.cacheService.delete(`${this.REDIS_KEY_PREFIX}:user-${userId}`)
  }
}
