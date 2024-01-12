import { Module } from '@nestjs/common'

import { LibModule } from '@/lib/lib.module'
import { AppController } from './app.controller'

@Module({
  imports: [LibModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
