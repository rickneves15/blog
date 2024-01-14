import { SetMetadata, applyDecorators } from '@nestjs/common'
import { IS_PUBLIC_KEY_META } from '../constants/metadata.contants'

/**
 * It sets a metadata key called "isPublic" to true
 * @returns A function that sets a metadata key called "isPublic" to true
 */

const publicAuthMiddleware = SetMetadata(IS_PUBLIC_KEY_META, true)

export const Public = () => applyDecorators(publicAuthMiddleware)
