import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppModule } from '@/modules/app.module'

const logger = new Logger('Bootstrap')

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService<Configs, true>)

  const host = configService.get('app.HOST')
  const port = configService.get('app.PORT')

  await app.listen(port)

  const appUrl = `${host}:${port}`

  logger.log(`==========================================================`)
  logger.log(`🚀 Application is running on: ${appUrl}`)
  logger.log(`==========================================================`)
}
bootstrap()
