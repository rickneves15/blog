/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import { ActiveUser, Public } from '@/shared/decorators'
import { multerConfig } from '../upload/multer.config'
import { UploadService } from '../upload/upload.service'
import { CreatePostBodyDto } from './dto/create-post.dto'
import { UpdatePostBodyDto } from './dto/update-post.dto'
import { PostService } from './post.service'

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly uploadService: UploadService,
  ) {}

  @UseInterceptors(FileInterceptor('file', multerConfig))
  @Post()
  async create(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Request() request: any,
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreatePostBodyDto,
  ) {
    const post: any = data

    if (file) {
      const fileName = file?.filename

      if (!fileName) {
        return {
          message:
            'Validation failed (expected type is image/png, image/jpg, image/jpeg)',
          error: 'Bad Request',
          statusCode: 400,
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const fileUploaded = await this.uploadService.send(file, request)
        post.fileId = fileUploaded.id
      }
    }

    return this.postService.create({
      ...post,
      userId: request.user.id,
    })
  }

  @Public()
  @Get()
  findAll() {
    return this.postService.findAll()
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findById(id)
  }

  @UseInterceptors(FileInterceptor('file', multerConfig))
  @Patch(':id')
  async update(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Request() request: any,
    @ActiveUser('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Body() data: UpdatePostBodyDto,
  ) {
    const post: any = data
    if (file) {
      const fileName = file?.filename

      if (!fileName) {
        return {
          message:
            'Validation failed (expected type is image/png, image/jpg, image/jpeg)',
          error: 'Bad Request',
          statusCode: 400,
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const fileUploaded = await this.uploadService.send(file, request)
        post.fileId = fileUploaded.id
      }
    }

    return this.postService.update(userId, id, {
      ...post,
      userId: request.user.id,
    })
  }

  @Delete(':id')
  remove(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Request() request: any,
    @Param('id') id: string,
  ) {
    return this.postService.remove(request.user.id, id)
  }

  @Get('/report')
  report() {
    return this.postService.report()
  }
}
