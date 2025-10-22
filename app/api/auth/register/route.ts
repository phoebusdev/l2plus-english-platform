import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users, students } from '@/lib/db/schema'
import { hashPassword } from '@/lib/auth/password'
import { registerUserSchema } from '@/lib/validation/auth'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validation = registerUserSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.flatten() },
        { status: 400 }
      )
    }

    const { email, password, fullName, phone, timezone, selfReportedLevel } = validation.data

    // Check if email already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1)

    if (existingUser.length > 0) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Create user and student in a transaction to ensure atomicity
    const user = await db.transaction(async (tx) => {
      const [newUser] = await tx
        .insert(users)
        .values({
          email,
          passwordHash,
          fullName,
          phone,
          timezone,
          role: 'student',
          emailVerified: false,
        })
        .returning()

      await tx.insert(students).values({
        id: newUser.id, // Same ID as user (one-to-one relationship)
        selfReportedLevel: selfReportedLevel as any || null,
        paymentStatus: 'none',
      })

      return newUser
    })

    // TODO: Send registration confirmation email (Phase 3 - Email system)
    // TODO: Send Kondesk notification (Phase 7)

    return NextResponse.json(
      {
        success: true,
        userId: user.id,
        email: user.email,
        message: 'Registration successful',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
