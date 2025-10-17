import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'

export async function GET(request: NextRequest) {
  try {
    const allUsers = await db.select({
      id: users.id,
      email: users.email,
      role: users.role,
      fullName: users.fullName,
    }).from(users)

    return NextResponse.json({
      count: allUsers.length,
      users: allUsers,
    }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({
      error: 'Database query failed',
      message: error.message,
    }, { status: 500 })
  }
}
