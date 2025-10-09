import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { testResults } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get all test results for student
    const results = await db
      .select()
      .from(testResults)
      .where(eq(testResults.studentId, session.user.id))
      .orderBy(desc(testResults.completedAt))

    return NextResponse.json({
      results: results.map(r => ({
        id: r.id,
        score: r.score,
        percentage: r.percentage,
        assignedLevel: r.assignedLevel,
        completedAt: r.completedAt,
      })),
    })
  } catch (error) {
    console.error('Test results error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
