import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { REQUEST_USER_KEY } from '@/shared/constants'
import { userDto } from '../models'

export const ActiveUser = createParamDecorator(
  (field: keyof userDto | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const user: userDto | undefined = request[REQUEST_USER_KEY]
    return field ? user?.[field] : user
  },
)
