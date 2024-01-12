import { Module } from '@nestjs/common'
import { ConfigService, ConfigModule as NestConfigModule } from '@nestjs/config'

import { ConfigValidate } from './config.interface'
import { app, prisma } from './configs'

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: [`${process.cwd()}/.env`],
      load: [app, prisma],
      cache: true,
      isGlobal: true,
      expandVariables: true,
      validate: ConfigValidate,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
