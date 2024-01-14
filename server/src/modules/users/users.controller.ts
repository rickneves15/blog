import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { MeDto, MeSchema } from './dto/me.dto'
import { UsersService } from './users.service'

@UseGuards(AuthGuard())
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getMe(@Request() request: any): Promise<MeDto> {
    const user = await this.usersService.findById(request.user.id)
    return MeSchema.parse(user)
  }
}
