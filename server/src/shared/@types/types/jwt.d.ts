export type JwtPayload = {
  user: USerWithoutPassword
  sub: string
  iat: number
  exp: number
  tokenId: string
}
