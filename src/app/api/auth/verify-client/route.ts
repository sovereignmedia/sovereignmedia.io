import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const { password, clientId } = await request.json()

  if (!password || !clientId || typeof password !== 'string' || typeof clientId !== 'string') {
    return NextResponse.json({ valid: false }, { status: 400 })
  }

  const envKey = `${clientId.toUpperCase()}_PASSWORD`
  const clientPassword = process.env[envKey]

  if (!clientPassword) {
    return NextResponse.json({ valid: false }, { status: 500 })
  }

  const valid = password === clientPassword

  if (valid) {
    const cookieStore = await cookies()
    cookieStore.set(`${clientId}_access`, 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })
  }

  return NextResponse.json({ valid })
}
