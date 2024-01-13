import { Module } from '@nestjs/common'

import { LibModule } from '@/lib/lib.module'
import { APP_PIPE } from '@nestjs/core'
import { ZodValidationPipe } from 'nestjs-zod'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [AuthModule, LibModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
