import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { students, users, testResults, payments, enrollments, classSessions } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: studentId } = await params

    // Get student with user data
    const [student] = await db
      .select({
        id: students.id,
        email: users.email,
        fullName: users.fullName,
        phone: users.phone,
        timezone: users.timezone,
        selfReportedLevel: students.selfReportedLevel,
        assignedCefrLevel: students.assignedCefrLevel,
        paymentStatus: students.paymentStatus,
        stripeCustomerId: students.stripeCustomerId,
        createdAt: students.createdAt,
      })
      .from(students)
      .innerJoin(users, eq(students.id, users.id))
      .where(eq(students.id, studentId))
      .limit(1)

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    // Get test results
    const tests = await db
      .select()
      .from(testResults)
      .where(eq(testResults.studentId, studentId))
      .orderBy(testResults.completedAt)

    // Get payments
    const paymentsData = await db
      .select()
      .from(payments)
      .where(eq(payments.studentId, studentId))
      .orderBy(payments.createdAt)

    // Get enrollments with class details
    const enrollmentsData = await db
      .select({
        id: enrollments.id,
        enrolledAt: enrollments.enrolledAt,
        attended: enrollments.attended,
        classDateTime: classSessions.dateTime,
        cefrLevel: classSessions.cefrLevel,
        instructorName: classSessions.instructorName,
      })
      .from(enrollments)
      .innerJoin(classSessions, eq(enrollments.classSessionId, classSessions.id))
      .where(eq(enrollments.studentId, studentId))
      .orderBy(classSessions.dateTime)

    return NextResponse.json({
      student,
      tests,
      payments: paymentsData,
      enrollments: enrollmentsData,
    })
  } catch (error) {
    console.error('Admin student detail error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
