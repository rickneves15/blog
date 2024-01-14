import { Global, Module } from '@nestjs/common'

import { ServeStaticModule } from '@nestjs/serve-static'
import { UploadController } from './upload.controller'
import { UploadService } from './upload.service'

@Global()
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: process.cwd(),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
