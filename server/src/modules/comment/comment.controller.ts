import { ActiveUser } from '@/shared/decorators'
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { CommentService } from './comment.service'
import { CreateCommentRequestDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(
    @ActiveUser('id') userId: string,
    @Body() data: CreateCommentRequestDto,
  ) {
    return this.commentService.create({ ...data, userId })
  }

  @Patch(':id')
  update(
    @ActiveUser('id') userId: string,
    @Param('id') id: string,
    @Body() data: UpdateCommentDto,
  ) {
    return this.commentService.update(userId, id, {
      ...data,
    })
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@ActiveUser('id') userId: string, @Param('id') id: string) {
    return this.commentService.remove(userId, id)
  }
}
