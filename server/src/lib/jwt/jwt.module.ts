import { Module } from '@nestjs/common'
import { JwtModule as NestJwtModule } from '@nestjs/jwt'

import { jwtConfig } from '@/lib/config/configs'

@Module({
  imports: [
    NestJwtModule.register({
      global: true,
      secret: jwtConfig.SECRET_KEY,
      signOptions: { expiresIn: jwtConfig.ACCESS_TOKEN_TTL },
    }),
  ],
  providers: [],
  exports: [],
})
export class JWTModule {}
