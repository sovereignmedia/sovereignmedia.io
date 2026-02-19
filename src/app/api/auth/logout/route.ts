import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = await cookies()

  // Clear site access
  cookieStore.set('sovereign_access', '', { maxAge: 0, path: '/' })

  // Clear all client access cookies
  const allCookies = cookieStore.getAll()
  for (const cookie of allCookies) {
    if (cookie.name.endsWith('_access')) {
      cookieStore.set(cookie.name, '', { maxAge: 0, path: '/' })
    }
  }

  return NextResponse.json(
    { cleared: true },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}
