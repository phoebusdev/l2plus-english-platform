import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const session = await auth()

  return NextResponse.json({
    session: session,
    hasSession: !!session,
    hasUser: !!session?.user,
    userId: session?.user?.id || null,
    userEmail: session?.user?.email || null,
    userName: session?.user?.name || null,
    userRole: session?.user?.role || null,
    rawUser: session?.user || null,
  }, { status: 200 })
}
