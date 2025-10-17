import { db } from '../lib/db'
import {
  users,
  students,
  classSessions,
  enrollments,
  testResults,
  payments,
  pricingPlans,
  placementTests,
} from '../lib/db/schema'
import { hash } from '@node-rs/argon2'
import { eq } from 'drizzle-orm'

async function addDemoData() {
  console.log('🌱 Adding demo data...')

  try {
    // Get admin user for creating classes
    const [admin] = await db
      .select()
      .from(users)
      .where(eq(users.email, 'admin@l2plusenglish.com'))
      .limit(1)

    if (!admin) {
      console.error('❌ Admin user not found. Run seed script first.')
      return
    }

    // Get pricing plans
    const plans = await db.select().from(pricingPlans)
    if (plans.length === 0) {
      console.error('❌ No pricing plans found. Run seed script first.')
      return
    }

    // Get test
    const [test] = await db.select().from(placementTests).limit(1)
    if (!test) {
      console.error('❌ No placement test found. Run seed script first.')
      return
    }

    // Check if demo student already exists
    const [existingStudent] = await db
      .select()
      .from(users)
      .where(eq(users.email, 'student@demo.com'))
      .limit(1)

    let demoUser
    if (existingStudent) {
      console.log('ℹ Demo student already exists, using existing')
      demoUser = existingStudent
    } else {
      // Create demo student
      console.log('Creating demo student...')
      const studentPasswordHash = await hash('Student123!', {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      })

      const [newUser] = await db
        .insert(users)
        .values({
          email: 'student@demo.com',
          passwordHash: studentPasswordHash,
          fullName: 'Demo Student',
          phone: '+44 20 9876 5432',
          timezone: 'Europe/London',
          role: 'student',
          emailVerified: true,
        })
        .returning()

      await db.insert(students).values({
        id: newUser.id,
        selfReportedLevel: 'B1',
        assignedCefrLevel: 'B2',
        paymentStatus: 'active',
        stripeCustomerId: 'cus_demo_student',
      })

      demoUser = newUser
      console.log('✓ Demo student created:', demoUser.email)

      // Create demo payment
      console.log('Creating demo payment...')
      await db.insert(payments).values({
        studentId: demoUser.id,
        planId: plans[1].id, // Standard plan
        stripeCustomerId: 'cus_demo_student',
        stripeSubscriptionId: 'sub_demo_subscription',
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      })
      console.log('✓ Demo payment created')

      // Create demo test result
      console.log('Creating demo test result...')
      await db.insert(testResults).values({
        studentId: demoUser.id,
        testId: test.id,
        answers: Array.from({ length: 20 }, (_, i) => ({
          questionId: i + 1,
          selectedAnswer: i < 15 ? 'A' : 'B', // 15/20 correct = 75% = B2
        })),
        score: 15,
        percentage: 75,
        assignedLevel: 'B2',
      })
      console.log('✓ Demo test result created')
    }

    // Create demo classes (always create fresh ones)
    console.log('Creating demo classes...')
    const now = new Date()
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

    const demoClasses = await db
      .insert(classSessions)
      .values([
        {
          dateTime: tomorrow,
          cefrLevel: 'B2',
          zoomUrl: 'https://zoom.us/j/demo123456',
          capacity: 10,
          enrollmentCount: 1,
          instructorName: 'Sarah Johnson',
          createdBy: admin.id,
        },
        {
          dateTime: nextWeek,
          cefrLevel: 'B2',
          zoomUrl: 'https://zoom.us/j/demo789012',
          capacity: 10,
          enrollmentCount: 1,
          instructorName: 'Michael Chen',
          createdBy: admin.id,
        },
        {
          dateTime: new Date(nextWeek.getTime() + 3 * 24 * 60 * 60 * 1000),
          cefrLevel: 'B1',
          zoomUrl: 'https://zoom.us/j/demo345678',
          capacity: 10,
          enrollmentCount: 0,
          instructorName: 'Sarah Johnson',
          createdBy: admin.id,
        },
        {
          dateTime: new Date(nextWeek.getTime() + 5 * 24 * 60 * 60 * 1000),
          cefrLevel: 'B2',
          zoomUrl: 'https://zoom.us/j/demo901234',
          capacity: 10,
          enrollmentCount: 1,
          instructorName: 'Sarah Johnson',
          createdBy: admin.id,
        },
      ])
      .returning()

    console.log(`✓ Created ${demoClasses.length} demo classes`)

    // Enroll demo student in classes
    console.log('Creating demo enrollments...')
    await db.insert(enrollments).values([
      {
        studentId: demoUser.id,
        classSessionId: demoClasses[0].id,
        attended: false,
      },
      {
        studentId: demoUser.id,
        classSessionId: demoClasses[1].id,
        attended: false,
      },
      {
        studentId: demoUser.id,
        classSessionId: demoClasses[3].id,
        attended: false,
      },
    ])

    console.log('✓ Demo student enrolled in 3 classes')

    console.log('\n✅ Demo data added successfully!')
    console.log('\nDemo Student Credentials:')
    console.log('Email: student@demo.com')
    console.log('Password: Student123!')
  } catch (error) {
    console.error('❌ Add demo data failed:', error)
    throw error
  }
}

addDemoData()
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
  .then(() => {
    process.exit(0)
  })
