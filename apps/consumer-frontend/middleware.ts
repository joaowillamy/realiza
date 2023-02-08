import { frontendEnvs } from '@realiza/shared/utils'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isAuthenticated = IsAuthenticated(request)

  if (pathname.match(/private/gi) && !isAuthenticated) {
    const pathname = 'auth/sign-in'
    const { protocol, host } = request.nextUrl
    const url = new URL(`${protocol}//${host}/${pathname}?message-error=Sem altorização, antes entre em sua conta!`)
    return NextResponse.redirect(url)
  }

  // const authRegex = new RegExp(`${frontendEnvs.frontendUrl}/auth`,)
  if (pathname.match(/auth\//gi) && isAuthenticated) {
    const pathname = 'private/premium'
    const { protocol, host } = request.nextUrl
    const url = new URL(`${protocol}//${host}/${pathname}?message-info=Já possui um usuário autenticado!`)
    return NextResponse.redirect(url)
  }
}

function IsAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get('tokenHttpOnly')?.value

  return token?.length > 0 && token !== undefined && token !== "undefined"
}
