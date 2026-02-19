import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware — Route Protection
 *
 * Protects /proposals/* and /portal/* routes.
 * Checks for a valid session cookie or access token.
 *
 * Phase 1: Simple token-based auth via URL query param or cookie.
 * Phase 2: Upgrade to NextAuth.js session-based auth.
 */
export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // Only protect specific route prefixes
  const isProtectedRoute =
    pathname.startsWith('/proposals/') || pathname.startsWith('/portal/')

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // Extract client ID from path
  // e.g., /proposals/frontieras -> clientId = "frontieras"
  const segments = pathname.split('/')
  const clientId = segments[2] // [0]="" [1]="proposals" [2]="frontieras"

  if (!clientId) {
    return redirectToAuth(request, 'Missing client identifier')
  }

  // Check for access token
  // Priority: 1) Cookie, 2) URL query param (for initial access links)
  const cookieToken = request.cookies.get(`sovereign_access_${clientId}`)?.value
  const queryToken = searchParams.get('token')

  const token = cookieToken || queryToken

  if (!token) {
    return redirectToAuth(request, 'Authentication required')
  }

  // Validate token against environment variable
  const envKey = `CLIENT_TOKEN_${clientId.toUpperCase()}`
  const validToken = process.env[envKey]

  if (!validToken || token !== validToken) {
    return redirectToAuth(request, 'Invalid access token')
  }

  // If token came via query param, set it as a cookie for future visits
  if (queryToken && !cookieToken) {
    const response = NextResponse.next()
    response.cookies.set(`sovereign_access_${clientId}`, queryToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 90, // 90 days
      path: '/',
    })

    // Remove token from URL for cleanliness
    const cleanUrl = new URL(request.url)
    cleanUrl.searchParams.delete('token')
    return NextResponse.redirect(cleanUrl, { headers: response.headers })
  }

  return NextResponse.next()
}

function redirectToAuth(request: NextRequest, _reason: string) {
  // For now, return a simple 401 JSON response
  // TODO: Build a proper auth/login page and redirect there
  return new NextResponse(
    JSON.stringify({
      error: 'Access denied',
      message: 'This page requires authentication. Contact chase@sovereignmedia.io for access.',
    }),
    {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    }
  )
}

export const config = {
  matcher: ['/proposals/:path*', '/portal/:path*'],
}
