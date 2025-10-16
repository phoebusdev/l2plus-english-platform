import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { testResults } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    // Get specific test result for student
    const [result] = await db
      .select()
      .from(testResults)
      .where(
        and(
          eq(testResults.id, id),
          eq(testResults.studentId, session.user.id)
        )
      )
      .limit(1)

    if (!result) {
      return NextResponse.json(
        { error: 'Test result not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      id: result.id,
      score: result.score,
      percentage: result.percentage,
      assignedLevel: result.assignedLevel,
      completedAt: result.completedAt,
      answers: result.answers,
      testVersion: result.testVersion,
    })
  } catch (error) {
    console.error('Test result fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
