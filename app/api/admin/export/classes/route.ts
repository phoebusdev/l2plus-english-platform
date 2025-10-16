import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { classSessions } from '@/lib/db/schema'

/**
 * GET /api/admin/export/classes
 * Export class sessions data as CSV
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Query all class sessions
    const classesData = await db
      .select()
      .from(classSessions)
      .orderBy(classSessions.dateTime)

    // Generate CSV
    const headers = [
      'Date & Time (GMT)',
      'CEFR Level',
      'Zoom URL',
      'Capacity',
      'Enrollment Count',
      'Instructor Name',
      'Created At',
    ]

    const rows = classesData.map((classSession) => [
      new Date(classSession.dateTime).toLocaleString('en-GB'),
      classSession.cefrLevel,
      classSession.zoomUrl,
      classSession.capacity.toString(),
      classSession.enrollmentCount.toString(),
      classSession.instructorName || 'Not specified',
      new Date(classSession.createdAt).toLocaleDateString('en-GB'),
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
        'Content-Disposition': `attachment; filename="classes-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    })
  } catch (error) {
    console.error('Export classes error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
