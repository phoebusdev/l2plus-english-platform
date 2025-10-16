import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { students } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { stripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get student with Stripe customer ID
    const [student] = await db
      .select()
      .from(students)
      .where(eq(students.id, session.user.id))
      .limit(1)

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    if (!student.stripeCustomerId) {
      return NextResponse.json(
        { error: 'No payment method on file. Please subscribe to a plan first.' },
        { status: 400 }
      )
    }

    // Create Stripe Customer Portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: student.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
    })

    return NextResponse.json({ url: portalSession.url })
  } catch (error: any) {
    console.error('Billing portal error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create billing portal session' },
      { status: 500 }
    )
  }
}
