import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { pricingPlans } from '@/lib/db/schema'
import { asc } from 'drizzle-orm'

export async function GET() {
  try {
    // Fetch all pricing plans ordered by price
    const plans = await db
      .select()
      .from(pricingPlans)
      .orderBy(asc(pricingPlans.priceGbp))

    return NextResponse.json(plans, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching pricing plans:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pricing plans' },
      { status: 500 }
    )
  }
}
