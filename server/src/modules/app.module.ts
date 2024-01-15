import { Module } from '@nestjs/common'

import { LibModule } from '@/lib/lib.module'
import { APP_PIPE } from '@nestjs/core'
import { ZodValidationPipe } from 'nestjs-zod'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { CommentModule } from './comment/comment.module'
import { PostModule } from './post/post.module'
import { UploadModule } from './upload/upload.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    AuthModule,
    LibModule,
    UploadModule,
    UsersModule,
    PostModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
