import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { enrollments, students, users, classSessions } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

/**
 * GET /api/admin/export/enrollments
 * Export enrollments data as CSV
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Query enrollments with joins to get student info and class details
    const enrollmentsData = await db
      .select({
        studentName: users.fullName,
        studentEmail: users.email,
        classDateTime: classSessions.dateTime,
        cefrLevel: classSessions.cefrLevel,
        instructorName: classSessions.instructorName,
        attended: enrollments.attended,
        enrolledAt: enrollments.enrolledAt,
      })
      .from(enrollments)
      .innerJoin(students, eq(enrollments.studentId, students.id))
      .innerJoin(users, eq(students.id, users.id))
      .innerJoin(classSessions, eq(enrollments.classSessionId, classSessions.id))
      .orderBy(enrollments.enrolledAt)

    // Generate CSV
    const headers = [
      'Student Name',
      'Student Email',
      'Class Date & Time (GMT)',
      'CEFR Level',
      'Instructor Name',
      'Attended',
      'Enrolled At',
    ]

    const rows = enrollmentsData.map((enrollment) => [
      enrollment.studentName,
      enrollment.studentEmail,
      new Date(enrollment.classDateTime).toLocaleString('en-GB'),
      enrollment.cefrLevel,
      enrollment.instructorName || 'Not specified',
      enrollment.attended ? 'Yes' : 'No',
      new Date(enrollment.enrolledAt).toLocaleDateString('en-GB'),
    ])

    const csv = [
      headers.join(','),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
      ),
    ].join('\n')

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="enrollments-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    })
  } catch (error) {
    console.error('Export enrollments error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
