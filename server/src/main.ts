import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory, Reflector } from '@nestjs/core'

import { AppModule } from '@/modules/app.module'
import { AuthGuard } from './shared/guards/auth.guard'

const logger = new Logger('Bootstrap')

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService<Configs, true>)

  app.enableCors({
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    maxAge: 3600,
    origin: '*',
  })

  const reflector = app.get(Reflector)
  app.useGlobalGuards(new AuthGuard(reflector))

  const host = configService.get('app.HOST')
  const port = configService.get('app.PORT')

  await app.listen(port)

  const appUrl = `${host}:${port}`

  logger.log(`==========================================================`)
  logger.log(`🚀 Application is running on: ${appUrl}`)
  logger.log(`==========================================================`)
}
bootstrap()
