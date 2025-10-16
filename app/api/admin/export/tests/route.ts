import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { testResults, students, users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

/**
 * GET /api/admin/export/tests
 * Export test results data as CSV
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Query test results with joins to get student info
    const testsData = await db
      .select({
        studentName: users.fullName,
        studentEmail: users.email,
        score: testResults.score,
        percentage: testResults.percentage,
        assignedLevel: testResults.assignedLevel,
        completedAt: testResults.completedAt,
      })
      .from(testResults)
      .innerJoin(students, eq(testResults.studentId, students.id))
      .innerJoin(users, eq(students.id, users.id))
      .orderBy(testResults.completedAt)

    // Generate CSV
    const headers = [
      'Student Name',
      'Student Email',
      'Score',
      'Percentage',
      'Assigned CEFR Level',
      'Test Date',
    ]

    const rows = testsData.map((test) => [
      test.studentName,
      test.studentEmail,
      test.score.toString(),
      `${test.percentage}%`,
      test.assignedLevel,
      new Date(test.completedAt).toLocaleDateString('en-GB'),
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
        'Content-Disposition': `attachment; filename="test-results-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    })
  } catch (error) {
    console.error('Export tests error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
