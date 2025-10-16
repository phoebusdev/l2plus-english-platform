import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { classSessions } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const updateClassSchema = z.object({
  dateTime: z.string().datetime().optional(),
  cefrLevel: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']).optional(),
  zoomUrl: z.string().url().optional(),
  capacity: z.number().int().positive().optional(),
  instructorName: z.string().optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: classId } = await params

    const [classSession] = await db
      .select()
      .from(classSessions)
      .where(eq(classSessions.id, classId))
      .limit(1)

    if (!classSession) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 })
    }

    return NextResponse.json({ classSession })
  } catch (error) {
    console.error('Get class error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: classId } = await params
    const body = await request.json()
    const validation = updateClassSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid class data', details: validation.error },
        { status: 400 }
      )
    }

    const updates: any = {}
    if (validation.data.dateTime) updates.dateTime = new Date(validation.data.dateTime)
    if (validation.data.cefrLevel) updates.cefrLevel = validation.data.cefrLevel
    if (validation.data.zoomUrl) updates.zoomUrl = validation.data.zoomUrl
    if (validation.data.capacity) updates.capacity = validation.data.capacity
    if (validation.data.instructorName !== undefined) {
      updates.instructorName = validation.data.instructorName || null
    }
    updates.updatedAt = new Date()

    await db
      .update(classSessions)
      .set(updates)
      .where(eq(classSessions.id, classId))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Update class error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: classId } = await params

    // Delete class (cascade will delete enrollments and materials)
    await db
      .delete(classSessions)
      .where(eq(classSessions.id, classId))

    return NextResponse.json({ success: true }, { status: 204 })
  } catch (error) {
    console.error('Delete class error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
