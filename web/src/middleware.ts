import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.cookies.has('blog:token')) {
    if (request.nextUrl.pathname.startsWith('/sign')) {
      return NextResponse.redirect(new URL('/profile', request.url))
    }

    return NextResponse.next()
  }

  if (!request.nextUrl.pathname.startsWith('/sign')) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
}

export const config = {
  matcher: ['/profile', '/sign-in', '/sign-up'],
}
