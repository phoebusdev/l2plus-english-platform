import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { placementTests } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const questionSchema = z.object({
  id: z.number().int().min(1).max(25),
  questionText: z.string().min(1),
  optionA: z.string().min(1),
  optionB: z.string().min(1),
  optionC: z.string().min(1),
  optionD: z.string().min(1),
  correctAnswer: z.enum(['A', 'B', 'C', 'D']),
  page: z.number().int().min(1).max(5),
})

const updateTestSchema = z.object({
  questions: z.array(questionSchema).length(25), // Exactly 25 questions
})

/**
 * GET /api/admin/test/questions
 * Fetch active placement test questions WITH correct answers
 * Admin-only endpoint
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const [activeTest] = await db
      .select()
      .from(placementTests)
      .where(eq(placementTests.isActive, true))
      .limit(1)

    if (!activeTest) {
      return NextResponse.json({ error: 'No active test found' }, { status: 404 })
    }

    return NextResponse.json({
      testId: activeTest.id,
      version: activeTest.version,
      questions: activeTest.questions, // Includes correct answers for admin
    })
  } catch (error) {
    console.error('Get test questions error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * PUT /api/admin/test/questions
 * Update test questions by creating a new version
 * Marks old test as inactive and creates new active test
 */
export async function PUT(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validation = updateTestSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Invalid test data',
          details: validation.error.issues,
        },
        { status: 400 }
      )
    }

    const { questions } = validation.data

    // Validate that questions are distributed across 5 pages (5 per page)
    const pageDistribution = questions.reduce((acc, q) => {
      acc[q.page] = (acc[q.page] || 0) + 1
      return acc
    }, {} as Record<number, number>)

    for (let page = 1; page <= 5; page++) {
      if (pageDistribution[page] !== 5) {
        return NextResponse.json(
          {
            error: `Invalid page distribution. Page ${page} has ${pageDistribution[page] || 0} questions, expected 5`,
          },
          { status: 400 }
        )
      }
    }

    // Validate that question IDs are 1-25 (unique)
    const questionIds = questions.map((q) => q.id).sort((a, b) => a - b)
    for (let i = 1; i <= 25; i++) {
      if (questionIds[i - 1] !== i) {
        return NextResponse.json(
          { error: `Missing or duplicate question ID: ${i}` },
          { status: 400 }
        )
      }
    }

    // Get current active test to increment version
    const [currentTest] = await db
      .select()
      .from(placementTests)
      .where(eq(placementTests.isActive, true))
      .limit(1)

    const newVersion = currentTest ? currentTest.version + 1 : 1

    // Begin transaction: Deactivate old test and create new test
    // Step 1: Deactivate current test
    if (currentTest) {
      await db
        .update(placementTests)
        .set({ isActive: false, updatedAt: new Date() })
        .where(eq(placementTests.id, currentTest.id))
    }

    // Step 2: Create new active test
    const [newTest] = await db
      .insert(placementTests)
      .values({
        version: newVersion,
        questions: questions,
        isActive: true,
      })
      .returning()

    return NextResponse.json({
      success: true,
      test: {
        id: newTest.id,
        version: newTest.version,
        questionsCount: 25,
      },
    })
  } catch (error) {
    console.error('Update test questions error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
