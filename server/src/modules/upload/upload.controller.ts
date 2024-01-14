import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { FileInterceptor } from '@nestjs/platform-express'
import { multerConfig } from './multer.config'
import { UploadService } from './upload.service'

@UseGuards(AuthGuard())
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  upload(
    @UploadedFile()
    file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const fileName = file?.filename

    if (!fileName) {
      return {
        message:
          'Validation failed (expected type is image/png, image/jpg, image/jpeg)',
        error: 'Bad Request',
        statusCode: 400,
      }
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.uploadService.send(file, req)
  }
}
