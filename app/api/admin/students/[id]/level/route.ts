import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { students } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const updateLevelSchema = z.object({
  assignedCefrLevel: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
})

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: studentId } = await params
    const body = await request.json()
    const validation = updateLevelSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid CEFR level', details: validation.error },
        { status: 400 }
      )
    }

    const { assignedCefrLevel } = validation.data

    // Update student level
    await db
      .update(students)
      .set({
        assignedCefrLevel,
        updatedAt: new Date(),
      })
      .where(eq(students.id, studentId))

    return NextResponse.json({
      success: true,
      assignedCefrLevel,
    })
  } catch (error) {
    console.error('Update student level error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
