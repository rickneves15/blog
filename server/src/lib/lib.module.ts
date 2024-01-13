import { Global, Module } from '@nestjs/common'

import { BcryptService } from './bcrypt/bcrypt.service'
import { CacheModule } from './cache/cache.module'
import { ConfigModule } from './config/config.module'
import { PrismaService } from './database/prisma.service'
import { JWTModule } from './jwt/jwt.module'

@Global()
@Module({
  imports: [ConfigModule, CacheModule, JWTModule],
  providers: [BcryptService, PrismaService],
  exports: [BcryptService, PrismaService],
})
export class LibModule {}
