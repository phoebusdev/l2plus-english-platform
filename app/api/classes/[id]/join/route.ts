import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { classSessions, students, enrollments } from '@/lib/db/schema'
import { eq, and, sql } from 'drizzle-orm'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const classId = params.id

    // Get student record
    const [student] = await db
      .select()
      .from(students)
      .where(eq(students.id, session.user.id))
      .limit(1)

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    // Check payment status
    if (student.paymentStatus !== 'active') {
      return NextResponse.json(
        { error: 'Active subscription required to enroll in classes' },
        { status: 403 }
      )
    }

    // Get class session
    const [classSession] = await db
      .select()
      .from(classSessions)
      .where(eq(classSessions.id, classId))
      .limit(1)

    if (!classSession) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 })
    }

    // Check if class is full
    if (classSession.enrollmentCount >= classSession.capacity) {
      return NextResponse.json({ error: 'Class is full' }, { status: 400 })
    }

    // Check if student's level matches class level
    if (student.assignedCefrLevel !== classSession.cefrLevel) {
      return NextResponse.json(
        { error: 'This class is not for your CEFR level' },
        { status: 400 }
      )
    }

    // Check if already enrolled
    const [existingEnrollment] = await db
      .select()
      .from(enrollments)
      .where(
        and(
          eq(enrollments.studentId, student.id),
          eq(enrollments.classSessionId, classId)
        )
      )
      .limit(1)

    if (existingEnrollment) {
      return NextResponse.json(
        { error: 'Already enrolled in this class' },
        { status: 400 }
      )
    }

    // Create enrollment
    await db.insert(enrollments).values({
      studentId: student.id,
      classSessionId: classId,
    })

    // Increment enrollment count
    await db
      .update(classSessions)
      .set({
        enrollmentCount: sql`${classSessions.enrollmentCount} + 1`,
      })
      .where(eq(classSessions.id, classId))

    // Return zoom URL for immediate join
    return NextResponse.json({
      success: true,
      message: 'Successfully enrolled in class',
      zoomUrl: classSession.zoomUrl,
    })
  } catch (error: any) {
    console.error('Class join error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
