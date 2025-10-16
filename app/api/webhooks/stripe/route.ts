import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'
import { payments, students } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  try {
    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        break

      case 'invoice.paid':
        await handleInvoicePaid(event.data.object as Stripe.Invoice)
        break

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const { studentId, planId } = session.metadata || {}

  if (!studentId || !planId) {
    console.error('Missing metadata in checkout session')
    return
  }

  // Create payment record
  await db.insert(payments).values({
    studentId,
    planId,
    stripeCustomerId: session.customer as string,
    stripeSubscriptionId: session.subscription as string | null,
    stripePaymentIntentId: session.payment_intent as string | null,
    status: 'active',
    currentPeriodStart: session.subscription ? new Date() : null,
    currentPeriodEnd: session.subscription ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : null, // 30 days
  })

  // Update student payment status
  await db
    .update(students)
    .set({
      paymentStatus: 'active',
      stripeCustomerId: session.customer as string,
    })
    .where(eq(students.id, studentId))

  console.log(`Payment created for student ${studentId}`)
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string
  const subscriptionId = invoice.subscription as string

  // Find payment by subscription ID
  const [payment] = await db
    .select()
    .from(payments)
    .where(eq(payments.stripeSubscriptionId, subscriptionId))
    .limit(1)

  if (!payment) {
    console.error('Payment not found for subscription:', subscriptionId)
    return
  }

  // Update payment status to active
  await db
    .update(payments)
    .set({
      status: 'active',
      failedAt: null,
      gracePeriodEndsAt: null,
      currentPeriodStart: new Date(invoice.period_start * 1000),
      currentPeriodEnd: new Date(invoice.period_end * 1000),
    })
    .where(eq(payments.id, payment.id))

  // Update student payment status
  await db
    .update(students)
    .set({ paymentStatus: 'active' })
    .where(eq(students.id, payment.studentId))

  console.log(`Invoice paid for subscription ${subscriptionId}`)

  // TODO: Send payment success email
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription as string

  // Find payment by subscription ID
  const [payment] = await db
    .select()
    .from(payments)
    .where(eq(payments.stripeSubscriptionId, subscriptionId))
    .limit(1)

  if (!payment) {
    console.error('Payment not found for subscription:', subscriptionId)
    return
  }

  const now = new Date()
  const gracePeriodEndsAt = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000) // 3 days

  // Update payment status to failed with grace period
  await db
    .update(payments)
    .set({
      status: 'failed',
      failedAt: now,
      gracePeriodEndsAt,
    })
    .where(eq(payments.id, payment.id))

  // Update student payment status
  await db
    .update(students)
    .set({ paymentStatus: 'failed' })
    .where(eq(students.id, payment.studentId))

  console.log(`Payment failed for subscription ${subscriptionId}, grace period until ${gracePeriodEndsAt}`)

  // TODO: Send payment failed email with grace period notice
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const subscriptionId = subscription.id

  // Find payment by subscription ID
  const [payment] = await db
    .select()
    .from(payments)
    .where(eq(payments.stripeSubscriptionId, subscriptionId))
    .limit(1)

  if (!payment) {
    console.error('Payment not found for subscription:', subscriptionId)
    return
  }

  // Update payment status to cancelled
  await db
    .update(payments)
    .set({
      status: 'cancelled',
      cancelAtPeriodEnd: true,
    })
    .where(eq(payments.id, payment.id))

  // Update student payment status
  await db
    .update(students)
    .set({ paymentStatus: 'cancelled' })
    .where(eq(students.id, payment.studentId))

  console.log(`Subscription cancelled: ${subscriptionId}`)

  // TODO: Send subscription cancelled email
}

// Disable body parser for webhook route
export const config = {
  api: {
    bodyParser: false,
  },
}
