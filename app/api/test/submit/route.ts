import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { students, placementTests, testResults } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { submitTestSchema } from '@/lib/validation/test'
import { calculateCEFRLevel } from '@/lib/utils/cefr'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // Validate input
    const validation = submitTestSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.flatten() },
        { status: 400 }
      )
    }

    const { testId, answers } = validation.data

    // Get test with correct answers
    const [test] = await db
      .select()
      .from(placementTests)
      .where(eq(placementTests.id, testId))
      .limit(1)

    if (!test) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 })
    }

    const questions = test.questions as any[]

    // Score the test
    let correctCount = 0
    for (const answer of answers) {
      const question = questions.find(q => q.id === answer.questionId)
      if (question && question.correctAnswer === answer.selectedAnswer) {
        correctCount++
      }
    }

    const score = correctCount
    const percentage = Math.round((correctCount / 20) * 100)
    const assignedLevel = calculateCEFRLevel(percentage)

    // Insert test result
    const [result] = await db
      .insert(testResults)
      .values({
        studentId: session.user.id,
        testId: test.id,
        answers: answers as any,
        score,
        percentage,
        assignedLevel,
      })
      .returning()

    // Update student's assigned CEFR level
    await db
      .update(students)
      .set({
        assignedCefrLevel: assignedLevel,
        updatedAt: new Date(),
      })
      .where(eq(students.id, session.user.id))

    // TODO: Send test result email (Phase 3 - Email system)

    return NextResponse.json({
      testResultId: result.id,
      score,
      percentage,
      assignedLevel,
      message: 'Test submitted successfully',
    })
  } catch (error) {
    console.error('Submit test error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
