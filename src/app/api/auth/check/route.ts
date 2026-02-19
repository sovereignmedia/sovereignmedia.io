import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const hasAccess = cookieStore.get('sovereign_access')?.value === 'true'
  return NextResponse.json(
    { authenticated: hasAccess },
    { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate', 'Pragma': 'no-cache' } }
  )
}
