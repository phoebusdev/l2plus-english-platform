import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { students, pricingPlans } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { stripe } from '@/lib/stripe'
import { z } from 'zod'

const checkoutSchema = z.object({
  priceId: z.string().min(1, 'Price ID is required'),
})

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Validate request body
    const body = await request.json()
    const validation = checkoutSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.error },
        { status: 400 }
      )
    }

    const { priceId } = validation.data

    // Get student data
    const [student] = await db
      .select()
      .from(students)
      .where(eq(students.id, session.user.id))
      .limit(1)

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    // Get pricing plan to determine mode
    const [plan] = await db
      .select()
      .from(pricingPlans)
      .where(eq(pricingPlans.stripePriceId, priceId))
      .limit(1)

    if (!plan) {
      return NextResponse.json({ error: 'Pricing plan not found' }, { status: 404 })
    }

    // Determine checkout mode based on billing cycle
    const mode = plan.billingCycle === 'monthly' ? 'subscription' : 'payment'

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer_email: session.user.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?payment=cancelled`,
      metadata: {
        studentId: student.id,
        planId: plan.id,
      },
      subscription_data: mode === 'subscription' ? {
        metadata: {
          studentId: student.id,
          planId: plan.id,
        },
      } : undefined,
    })

    return NextResponse.json({
      url: checkoutSession.url,
      sessionId: checkoutSession.id,
    })
  } catch (error: any) {
    console.error('Checkout session error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
