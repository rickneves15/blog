export type JwtPayload = {
  user: UserWithoutPassword
  sub: string
  iat: number
  exp: number
  tokenId: string
}
