import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { payments, students, users, pricingPlans } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

/**
 * GET /api/admin/export/payments
 * Export payments data as CSV
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Query payments with joins to get student name, email, and plan name
    const paymentsData = await db
      .select({
        studentName: users.fullName,
        studentEmail: users.email,
        planName: pricingPlans.name,
        billingCycle: pricingPlans.billingCycle,
        priceGbp: pricingPlans.priceGbp,
        status: payments.status,
        stripeCustomerId: payments.stripeCustomerId,
        stripeSubscriptionId: payments.stripeSubscriptionId,
        stripePaymentIntentId: payments.stripePaymentIntentId,
        currentPeriodStart: payments.currentPeriodStart,
        currentPeriodEnd: payments.currentPeriodEnd,
        failedAt: payments.failedAt,
        gracePeriodEndsAt: payments.gracePeriodEndsAt,
        createdAt: payments.createdAt,
      })
      .from(payments)
      .innerJoin(students, eq(payments.studentId, students.id))
      .innerJoin(users, eq(students.id, users.id))
      .innerJoin(pricingPlans, eq(payments.planId, pricingPlans.id))
      .orderBy(payments.createdAt)

    // Generate CSV
    const headers = [
      'Student Name',
      'Student Email',
      'Plan Name',
      'Billing Cycle',
      'Price (£)',
      'Status',
      'Stripe Customer ID',
      'Stripe Subscription ID',
      'Stripe Payment Intent ID',
      'Current Period Start',
      'Current Period End',
      'Failed At',
      'Grace Period Ends At',
      'Payment Date',
    ]

    const rows = paymentsData.map((payment) => [
      payment.studentName,
      payment.studentEmail,
      payment.planName,
      payment.billingCycle,
      `£${(payment.priceGbp / 100).toFixed(2)}`,
      payment.status,
      payment.stripeCustomerId || '',
      payment.stripeSubscriptionId || '',
      payment.stripePaymentIntentId || '',
      payment.currentPeriodStart ? new Date(payment.currentPeriodStart).toLocaleDateString('en-GB') : '',
      payment.currentPeriodEnd ? new Date(payment.currentPeriodEnd).toLocaleDateString('en-GB') : '',
      payment.failedAt ? new Date(payment.failedAt).toLocaleDateString('en-GB') : '',
      payment.gracePeriodEndsAt ? new Date(payment.gracePeriodEndsAt).toLocaleDateString('en-GB') : '',
      new Date(payment.createdAt).toLocaleDateString('en-GB'),
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
        'Content-Disposition': `attachment; filename="payments-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    })
  } catch (error) {
    console.error('Export payments error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
