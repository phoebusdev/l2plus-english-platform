import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { pricingPlans } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const updatePricingPlanSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().min(1).optional(),
  priceGbp: z.number().int().positive().optional(),
  features: z.array(z.string()).optional(),
  // Note: Cannot update stripePriceId or billingCycle as per requirements
  // These are tied to Stripe and should not be changed after creation
})

/**
 * PATCH /api/admin/pricing/[id]
 * Update pricing plan details (name, description, price, features)
 * Cannot update Stripe-related fields (stripePriceId, billingCycle)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: planId } = await params
    const body = await request.json()
    const validation = updatePricingPlanSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid pricing plan data', details: validation.error },
        { status: 400 }
      )
    }

    // Check if plan exists
    const [existingPlan] = await db
      .select()
      .from(pricingPlans)
      .where(eq(pricingPlans.id, planId))
      .limit(1)

    if (!existingPlan) {
      return NextResponse.json({ error: 'Pricing plan not found' }, { status: 404 })
    }

    // Build updates object
    const updates: any = { ...validation.data, updatedAt: new Date() }

    const [updatedPlan] = await db
      .update(pricingPlans)
      .set(updates)
      .where(eq(pricingPlans.id, planId))
      .returning()

    return NextResponse.json({ success: true, plan: updatedPlan })
  } catch (error) {
    console.error('Update pricing plan error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
