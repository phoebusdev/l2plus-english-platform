import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const session = await auth()

  if (!session?.user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect based on role
  if (session.user.role === 'admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  } else {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
}
