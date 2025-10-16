import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { payments, pricingPlans, students } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'

export async function GET(request: NextRequest) {
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

    // Get most recent payment
    const [payment] = await db
      .select({
        id: payments.id,
        status: payments.status,
        currentPeriodStart: payments.currentPeriodStart,
        currentPeriodEnd: payments.currentPeriodEnd,
        gracePeriodEndsAt: payments.gracePeriodEndsAt,
        failedAt: payments.failedAt,
        cancelAtPeriodEnd: payments.cancelAtPeriodEnd,
        planName: pricingPlans.name,
        planPrice: pricingPlans.priceGbp,
        billingCycle: pricingPlans.billingCycle,
      })
      .from(payments)
      .innerJoin(pricingPlans, eq(payments.planId, pricingPlans.id))
      .where(eq(payments.studentId, student.id))
      .orderBy(desc(payments.createdAt))
      .limit(1)

    if (!payment) {
      return NextResponse.json({
        hasPayment: false,
        paymentStatus: student.paymentStatus,
      })
    }

    return NextResponse.json({
      hasPayment: true,
      paymentStatus: student.paymentStatus,
      payment: {
        id: payment.id,
        status: payment.status,
        planName: payment.planName,
        planPrice: payment.planPrice,
        billingCycle: payment.billingCycle,
        currentPeriodStart: payment.currentPeriodStart,
        currentPeriodEnd: payment.currentPeriodEnd,
        gracePeriodEndsAt: payment.gracePeriodEndsAt,
        failedAt: payment.failedAt,
        cancelAtPeriodEnd: payment.cancelAtPeriodEnd,
      },
    })
  } catch (error) {
    console.error('Payment status error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
