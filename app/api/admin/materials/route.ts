import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { classMaterials, classSessions } from '@/lib/db/schema'
import { put } from '@vercel/blob'
import { eq } from 'drizzle-orm'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB in bytes
const ALLOWED_MIME_TYPE = 'application/pdf'

/**
 * POST /api/admin/materials
 * Upload class material (PDF) to Vercel Blob
 *
 * Request: multipart/form-data
 *   - class_session_id: UUID
 *   - file: PDF file (<= 10MB)
 *
 * Response: Material object
 */
export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const session = await auth()
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401 })
    }

    // Parse form data
    const formData = await request.formData()
    const classSessionId = formData.get('class_session_id') as string
    const file = formData.get('file') as File

    // Validate inputs
    if (!classSessionId) {
      return NextResponse.json({ error: 'class_session_id is required' }, { status: 400 })
    }

    if (!file) {
      return NextResponse.json({ error: 'file is required' }, { status: 400 })
    }

    // Validate file type
    if (file.type !== ALLOWED_MIME_TYPE) {
      return NextResponse.json(
        { error: `Invalid file type. Only PDF files are allowed (received: ${file.type})` },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds 10MB limit (received: ${(file.size / 1024 / 1024).toFixed(2)}MB)` },
        { status: 400 }
      )
    }

    // Verify class session exists
    const [classSession] = await db
      .select()
      .from(classSessions)
      .where(eq(classSessions.id, classSessionId))
      .limit(1)

    if (!classSession) {
      return NextResponse.json({ error: 'Class session not found' }, { status: 404 })
    }

    // Upload file to Vercel Blob
    const blob = await put(`class-materials/${classSessionId}/${file.name}`, file, {
      access: 'public',
      addRandomSuffix: true, // Prevent filename collisions
    })

    // Insert material record into database
    const [material] = await db
      .insert(classMaterials)
      .values({
        classSessionId,
        filename: file.name,
        filePath: blob.url,
        fileSizeBytes: file.size,
        mimeType: file.type,
        uploadedBy: session.user.id,
      })
      .returning()

    return NextResponse.json(
      {
        success: true,
        material: {
          id: material.id,
          filename: material.filename,
          filePath: material.filePath,
          fileSizeBytes: material.fileSizeBytes,
          uploadedAt: material.uploadedAt,
        },
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Material upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/admin/materials?id=<material_id>
 * Delete a class material
 *
 * Query params:
 *   - id: Material UUID
 *
 * Response: 204 No Content
 */
export async function DELETE(request: NextRequest) {
  try {
    // Check admin authentication
    const session = await auth()
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401 })
    }

    // Get material ID from query params
    const { searchParams } = new URL(request.url)
    const materialId = searchParams.get('id')

    if (!materialId) {
      return NextResponse.json({ error: 'Material ID is required' }, { status: 400 })
    }

    // Delete material from database (cascade will handle Blob cleanup if needed)
    const deletedRows = await db
      .delete(classMaterials)
      .where(eq(classMaterials.id, materialId))
      .returning()

    if (deletedRows.length === 0) {
      return NextResponse.json({ error: 'Material not found' }, { status: 404 })
    }

    // Note: Vercel Blob files are not automatically deleted when DB record is removed
    // Consider implementing cleanup cron job or manual deletion via del(url)
    // For now, orphaned blobs will remain but won't be accessible via the app

    return new NextResponse(null, { status: 204 })
  } catch (error: any) {
    console.error('Material deletion error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}
