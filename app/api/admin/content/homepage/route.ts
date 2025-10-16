import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { homepageContent } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const updateHomepageSchema = z.object({
  headline: z.string().min(1).max(255).optional(),
  subtext: z.string().min(1).optional(),
  step1Text: z.string().min(1).optional(),
  step2Text: z.string().min(1).optional(),
  step3Text: z.string().min(1).optional(),
  ctaText: z.string().min(1).max(100).optional(),
})

/**
 * GET /api/admin/content/homepage
 * Fetch homepage content for editing
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const [content] = await db
      .select()
      .from(homepageContent)
      .where(eq(homepageContent.id, 1))
      .limit(1)

    if (!content) {
      return NextResponse.json({ error: 'Homepage content not found' }, { status: 404 })
    }

    return NextResponse.json({ content })
  } catch (error) {
    console.error('Get homepage content error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * PATCH /api/admin/content/homepage
 * Update homepage content
 */
export async function PATCH(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validation = updateHomepageSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid homepage data', details: validation.error },
        { status: 400 }
      )
    }

    const updates: any = { ...validation.data, updatedAt: new Date() }

    const [updatedContent] = await db
      .update(homepageContent)
      .set(updates)
      .where(eq(homepageContent.id, 1))
      .returning()

    return NextResponse.json({ success: true, content: updatedContent })
  } catch (error) {
    console.error('Update homepage content error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
