import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { REQUEST_USER_KEY } from '@/shared/constants'
import { UserDto } from '@/shared/models'

export const ActiveUser = createParamDecorator(
  (field: keyof UserDto | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const user: UserDto | undefined = request[REQUEST_USER_KEY]
    return field ? user?.[field] : user
  },
)
