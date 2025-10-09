import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { placementTests } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check eligibility first (should be done on client but double-check)
    const eligibilityCheck = await fetch(
      new URL('/api/test/eligibility', request.url).toString(),
      {
        headers: request.headers,
      }
    )
    const eligibility = await eligibilityCheck.json()

    if (!eligibility.eligible) {
      return NextResponse.json(
        { error: 'Not eligible to take test', details: eligibility },
        { status: 403 }
      )
    }

    // Get active placement test
    const [test] = await db
      .select()
      .from(placementTests)
      .where(eq(placementTests.isActive, true))
      .limit(1)

    if (!test) {
      return NextResponse.json({ error: 'No active test available' }, { status: 404 })
    }

    // Remove correct answers from questions (security)
    const questions = (test.questions as any[]).map(q => ({
      id: q.id,
      question: q.question,
      options: q.options,
      // DO NOT include correctAnswer in response
    }))

    return NextResponse.json({
      testId: test.id,
      questions,
    })
  } catch (error) {
    console.error('Start test error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
