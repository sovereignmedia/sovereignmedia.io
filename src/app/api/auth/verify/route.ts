import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const { password } = await request.json()

  if (!password || typeof password !== 'string') {
    return NextResponse.json({ valid: false }, { status: 400 })
  }

  const sitePassword = process.env.SITE_PASSWORD
  if (!sitePassword) {
    return NextResponse.json({ valid: false }, { status: 500 })
  }

  const valid = password === sitePassword

  if (valid) {
    const cookieStore = await cookies()
    cookieStore.set('sovereign_access', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
  }

  return NextResponse.json({ valid })
}
