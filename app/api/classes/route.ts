import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { classSessions, students, enrollments } from '@/lib/db/schema'
import { eq, and, gt, lt, sql } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get student record
    const [student] = await db
      .select()
      .from(students)
      .where(eq(students.id, session.user.id))
      .limit(1)

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    // Check if student has assigned CEFR level
    if (!student.assignedCefrLevel) {
      return NextResponse.json({
        classes: [],
        message: 'Please complete the placement test to see available classes',
      })
    }

    // Get limit from query params (default 10)
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')

    // Get upcoming classes for student's level that are not full
    const classes = await db
      .select({
        id: classSessions.id,
        dateTime: classSessions.dateTime,
        cefrLevel: classSessions.cefrLevel,
        zoomUrl: classSessions.zoomUrl,
        capacity: classSessions.capacity,
        enrollmentCount: classSessions.enrollmentCount,
        instructorName: classSessions.instructorName,
        isEnrolled: sql<boolean>`EXISTS(
          SELECT 1 FROM ${enrollments}
          WHERE ${enrollments.classSessionId} = ${classSessions.id}
          AND ${enrollments.studentId} = ${student.id}
        )`,
      })
      .from(classSessions)
      .where(
        and(
          eq(classSessions.cefrLevel, student.assignedCefrLevel),
          gt(classSessions.dateTime, new Date()),
          lt(classSessions.enrollmentCount, classSessions.capacity)
        )
      )
      .orderBy(classSessions.dateTime)
      .limit(limit)

    return NextResponse.json({
      classes,
      studentLevel: student.assignedCefrLevel,
      paymentStatus: student.paymentStatus,
    })
  } catch (error) {
    console.error('Classes list error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
