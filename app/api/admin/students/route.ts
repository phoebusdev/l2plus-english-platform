import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { students, users } from '@/lib/db/schema'
import { eq, like, or } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    // Check admin role
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const paymentStatus = searchParams.get('paymentStatus')
    const cefrLevel = searchParams.get('cefrLevel')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Build query with filters
    let query = db
      .select({
        id: students.id,
        email: users.email,
        fullName: users.fullName,
        phone: users.phone,
        selfReportedLevel: students.selfReportedLevel,
        assignedCefrLevel: students.assignedCefrLevel,
        paymentStatus: students.paymentStatus,
        createdAt: students.createdAt,
      })
      .from(students)
      .innerJoin(users, eq(students.id, users.id))

    // Apply filters
    const conditions = []
    if (paymentStatus) {
      conditions.push(eq(students.paymentStatus, paymentStatus as any))
    }
    if (cefrLevel) {
      conditions.push(eq(students.assignedCefrLevel, cefrLevel as any))
    }
    if (search) {
      conditions.push(
        or(
          like(users.email, `%${search}%`),
          like(users.fullName, `%${search}%`)
        )!
      )
    }

    const studentsData = await query
      .limit(limit)
      .offset(offset)

    // Get total count
    const [totalResult] = await db
      .select({ count: db.$count(students) })
      .from(students)

    return NextResponse.json({
      students: studentsData,
      total: totalResult.count,
      limit,
      offset,
    })
  } catch (error) {
    console.error('Admin students list error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
