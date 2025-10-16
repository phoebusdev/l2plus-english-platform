import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { classSessions } from '@/lib/db/schema'
import { gte, lte, and, eq } from 'drizzle-orm'
import { z } from 'zod'

const createClassSchema = z.object({
  dateTime: z.string().datetime(),
  cefrLevel: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
  zoomUrl: z.string().url(),
  capacity: z.number().int().positive(),
  instructorName: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const cefrLevel = searchParams.get('cefrLevel')
    const fromDate = searchParams.get('fromDate')
    const toDate = searchParams.get('toDate')

    const conditions = []
    if (cefrLevel) {
      conditions.push(eq(classSessions.cefrLevel, cefrLevel as any))
    }
    if (fromDate) {
      conditions.push(gte(classSessions.dateTime, new Date(fromDate)))
    }
    if (toDate) {
      conditions.push(lte(classSessions.dateTime, new Date(toDate)))
    }

    const classes = await db
      .select()
      .from(classSessions)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(classSessions.dateTime)

    return NextResponse.json({ classes })
  } catch (error) {
    console.error('Admin classes list error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validation = createClassSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid class data', details: validation.error },
        { status: 400 }
      )
    }

    const data = validation.data

    // Insert class session
    const [newClass] = await db
      .insert(classSessions)
      .values({
        dateTime: new Date(data.dateTime),
        cefrLevel: data.cefrLevel,
        zoomUrl: data.zoomUrl,
        capacity: data.capacity,
        instructorName: data.instructorName || null,
        createdBy: session.user.id,
      })
      .returning()

    return NextResponse.json({ class: newClass }, { status: 201 })
  } catch (error) {
    console.error('Create class error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
