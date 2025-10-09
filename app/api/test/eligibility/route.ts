import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { students, testResults } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { isWithinRetakeWindow, getNextTestDate } from '@/lib/utils/date'

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

    // Get last test result
    const [lastTest] = await db
      .select()
      .from(testResults)
      .where(eq(testResults.studentId, student.id))
      .orderBy(desc(testResults.completedAt))
      .limit(1)

    if (!lastTest) {
      // Never taken test before - eligible
      return NextResponse.json({
        eligible: true,
      })
    }

    // Check 7-day retake window
    const withinWindow = isWithinRetakeWindow(lastTest.completedAt)

    if (withinWindow) {
      const nextDate = getNextTestDate(lastTest.completedAt)
      return NextResponse.json({
        eligible: false,
        reason: 'You must wait 7 days between tests',
        lastTestDate: lastTest.completedAt,
        nextAvailableDate: nextDate,
      })
    }

    return NextResponse.json({
      eligible: true,
      lastTestDate: lastTest.completedAt,
    })
  } catch (error) {
    console.error('Test eligibility error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
