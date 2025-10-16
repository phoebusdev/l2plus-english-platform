import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { classMaterials, enrollments, students, classSessions } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const sessionId = params.sessionId

    // Get student record
    const [student] = await db
      .select()
      .from(students)
      .where(eq(students.id, session.user.id))
      .limit(1)

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    // Get class session
    const [classSession] = await db
      .select()
      .from(classSessions)
      .where(eq(classSessions.id, sessionId))
      .limit(1)

    if (!classSession) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 })
    }

    // Check if student is enrolled OR if class is for their level
    const [enrollment] = await db
      .select()
      .from(enrollments)
      .where(
        and(
          eq(enrollments.studentId, student.id),
          eq(enrollments.classSessionId, sessionId)
        )
      )
      .limit(1)

    const hasAccess =
      enrollment !== undefined ||
      classSession.cefrLevel === student.assignedCefrLevel

    if (!hasAccess) {
      return NextResponse.json(
        { error: 'You do not have access to these materials' },
        { status: 403 }
      )
    }

    // Get materials for this class session
    const materials = await db
      .select({
        id: classMaterials.id,
        filename: classMaterials.filename,
        fileSizeBytes: classMaterials.fileSizeBytes,
        uploadedAt: classMaterials.uploadedAt,
        downloadUrl: classMaterials.filePath, // This should be a signed URL in production
      })
      .from(classMaterials)
      .where(eq(classMaterials.classSessionId, sessionId))
      .orderBy(classMaterials.uploadedAt)

    return NextResponse.json({
      materials,
      classSession: {
        id: classSession.id,
        dateTime: classSession.dateTime,
        cefrLevel: classSession.cefrLevel,
        instructorName: classSession.instructorName,
      },
    })
  } catch (error) {
    console.error('Materials fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
