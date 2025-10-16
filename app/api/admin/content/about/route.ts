import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { aboutUsContent } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const instructorPhotoSchema = z.object({
  name: z.string().min(1),
  photoUrl: z.string().url(),
  bio: z.string().min(1),
})

const updateAboutSchema = z.object({
  contentHtml: z.string().min(1).optional(),
  instructorPhotos: z.array(instructorPhotoSchema).optional(),
})

/**
 * GET /api/admin/content/about
 * Fetch about us content for editing
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const [content] = await db
      .select()
      .from(aboutUsContent)
      .where(eq(aboutUsContent.id, 1))
      .limit(1)

    if (!content) {
      return NextResponse.json({ error: 'About us content not found' }, { status: 404 })
    }

    return NextResponse.json({ content })
  } catch (error) {
    console.error('Get about us content error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * PATCH /api/admin/content/about
 * Update about us content
 */
export async function PATCH(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validation = updateAboutSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid about us data', details: validation.error },
        { status: 400 }
      )
    }

    const updates: any = { ...validation.data, updatedAt: new Date() }

    const [updatedContent] = await db
      .update(aboutUsContent)
      .set(updates)
      .where(eq(aboutUsContent.id, 1))
      .returning()

    return NextResponse.json({ success: true, content: updatedContent })
  } catch (error) {
    console.error('Update about us content error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
