import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { classMaterials, enrollments, classSessions, students } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function GET() {
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

    // Get all enrolled classes with their materials
    const enrolledClasses = await db
      .select({
        classId: classSessions.id,
        className: classSessions.instructorName,
        cefrLevel: classSessions.cefrLevel,
        dateTime: classSessions.dateTime,
        zoomUrl: classSessions.zoomUrl,
      })
      .from(enrollments)
      .innerJoin(classSessions, eq(enrollments.classSessionId, classSessions.id))
      .where(eq(enrollments.studentId, student.id))
      .orderBy(classSessions.dateTime)

    // For each class, get materials
    const classesWithMaterials = await Promise.all(
      enrolledClasses.map(async (classSession) => {
        const materials = await db
          .select({
            id: classMaterials.id,
            filename: classMaterials.filename,
            fileSizeBytes: classMaterials.fileSizeBytes,
            uploadedAt: classMaterials.uploadedAt,
            downloadUrl: classMaterials.filePath,
          })
          .from(classMaterials)
          .where(eq(classMaterials.classSessionId, classSession.classId))
          .orderBy(classMaterials.uploadedAt)

        return {
          ...classSession,
          materials,
        }
      })
    )

    return NextResponse.json({
      classes: classesWithMaterials,
      studentLevel: student.assignedCefrLevel,
    })
  } catch (error) {
    console.error('Materials fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
