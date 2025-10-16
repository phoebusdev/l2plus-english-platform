import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { students, users, testResults } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get all students with their latest test score
    const studentsData = await db
      .select({
        fullName: users.fullName,
        email: users.email,
        phone: users.phone,
        timezone: users.timezone,
        selfReportedLevel: students.selfReportedLevel,
        assignedCefrLevel: students.assignedCefrLevel,
        paymentStatus: students.paymentStatus,
        createdAt: students.createdAt,
      })
      .from(students)
      .innerJoin(users, eq(students.id, users.id))
      .orderBy(students.createdAt)

    // Generate CSV
    const headers = [
      'Full Name',
      'Email',
      'Phone',
      'Timezone',
      'Self Reported Level',
      'Assigned CEFR Level',
      'Payment Status',
      'Registration Date',
    ]

    const rows = studentsData.map((student) => [
      student.fullName,
      student.email,
      student.phone || '',
      student.timezone || '',
      student.selfReportedLevel || '',
      student.assignedCefrLevel || '',
      student.paymentStatus,
      new Date(student.createdAt).toLocaleDateString(),
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
        'Content-Disposition': `attachment; filename="students-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    })
  } catch (error) {
    console.error('Export students error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
