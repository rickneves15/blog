import { BadRequestException, Injectable } from '@nestjs/common'
import { randomUUID } from 'node:crypto'

import { BcryptService } from '@/lib/bcrypt/bcrypt.service'
import { CacheService } from '@/lib/cache/cache.service'
import { PrismaService } from '@/lib/database/prisma.service'
import { UserDto } from '@/shared/models'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'

@Injectable()
export class AuthService {
  private REDIS_KEY_PREFIX

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    private readonly cacheService: CacheService,
  ) {
    this.REDIS_KEY_PREFIX = this.configService.get('redis.REDIS_KEY_PREFIX')
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

    return await this.generateAccessToken(user)
  }

  async signOut(userId: string): Promise<void> {
    await this.cacheService.delete(`${this.REDIS_KEY_PREFIX}:user-${userId}`)
  }

  async generateAccessToken(
    user: Partial<UserDto>,
  ): Promise<{ accessToken: string }> {
    const tokenId = randomUUID()

    await this.cacheService.set(
      `${this.REDIS_KEY_PREFIX}:user-${user.id}`,
      tokenId,
    )

    const accessToken = await this.jwtService.signAsync(
      {
        id: user.id,
        email: user.email,
        tokenId,
      },
      {
        secret: this.configService.get('jwt.SECRET_KEY'),
        expiresIn: this.configService.get('jwt.ACCESS_TOKEN_TTL'),
      },
    )

    return { accessToken }
  }
}
