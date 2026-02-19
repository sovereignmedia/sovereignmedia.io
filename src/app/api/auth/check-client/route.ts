import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const clientId = searchParams.get('clientId')

  if (!clientId) {
    return NextResponse.json({ authenticated: false }, { status: 400 })
  }

  const cookieStore = await cookies()
  const hasAccess = cookieStore.get(`${clientId}_access`)?.value === 'true'
  return NextResponse.json({ authenticated: hasAccess })
}
