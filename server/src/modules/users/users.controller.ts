import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common'

import { MeDto, MeSchema } from './dto/me.dto'
import {
  UserEditDto,
  UserEditResponseDto,
  UserEditResponseSchema,
} from './dto/user-edit'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get('me')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getMe(@Request() request: any): Promise<MeDto> {
    const user = await this.usersService.findById(request.user.id)
    return MeSchema.parse(user)
  }

  @HttpCode(HttpStatus.OK)
  @Post('edit')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async edit(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Request() request: any,
    @Body() data: Partial<UserEditDto>,
  ): Promise<UserEditResponseDto> {
    const user = await this.usersService.edit(request.user.id, data)
    return UserEditResponseSchema.parse(user)
  }
}
