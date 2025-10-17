import { db } from './index'
import {
  users,
  students,
  pricingPlans,
  placementTests,
  homepageContent,
  aboutUsContent,
  classSessions,
  enrollments,
  testResults,
  payments,
} from './schema'
import { hash } from '@node-rs/argon2'

async function seed() {
  console.log('🌱 Seeding database...')

  try {
    // 1. Create admin user
    console.log('Creating admin user...')
    const adminPasswordHash = await hash('Admin123!', {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    })

    const [admin] = await db
      .insert(users)
      .values({
        email: 'admin@l2plusenglish.com',
        passwordHash: adminPasswordHash,
        fullName: 'L2+ Admin',
        phone: '+44 20 1234 5678',
        timezone: 'Europe/London',
        role: 'admin',
        emailVerified: true,
      })
      .returning()

    console.log('✓ Admin user created:', admin.email)

    // 2. Create pricing plans
    console.log('Creating pricing plans...')
    const plans = await db
      .insert(pricingPlans)
      .values([
        {
          name: 'Starter',
          description:
            'Perfect for beginners looking to build foundational English skills with regular group classes.',
          priceGbp: 4900, // £49.00
          billingCycle: 'monthly',
          stripePriceId: 'price_starter_monthly', // Replace with actual Stripe price ID
          features: [
            '4 group classes per month',
            'Access to class materials',
            'Email support',
            'Progress tracking',
          ],
          isActive: true,
          displayOrder: 1,
        },
        {
          name: 'Standard',
          description:
            'Ideal for intermediate learners wanting more practice and interaction with native speakers.',
          priceGbp: 8900, // £89.00
          billingCycle: 'monthly',
          stripePriceId: 'price_standard_monthly', // Replace with actual Stripe price ID
          features: [
            '8 group classes per month',
            'Access to class materials',
            'Priority email support',
            'Progress tracking',
            'Monthly 1-on-1 review session',
          ],
          isActive: true,
          displayOrder: 2,
        },
        {
          name: 'Intensive',
          description:
            'Comprehensive immersion for advanced learners focused on fluency and professional English.',
          priceGbp: 12900, // £129.00
          billingCycle: 'monthly',
          stripePriceId: 'price_intensive_monthly', // Replace with actual Stripe price ID
          features: [
            '12 group classes per month',
            'Access to class materials',
            'Priority email support',
            'Progress tracking',
            'Weekly 1-on-1 sessions',
            'Business English workshops',
          ],
          isActive: true,
          displayOrder: 3,
        },
        {
          name: 'Private 1:1 Session',
          description:
            'Personalized one-on-one lessons tailored to your specific learning goals and schedule.',
          priceGbp: 19900, // £199.00
          billingCycle: 'one_time',
          stripePriceId: 'price_private_onetime', // Replace with actual Stripe price ID
          features: [
            '60-minute private session',
            'Customized lesson plan',
            'Flexible scheduling',
            'Focused skill improvement',
            'Instant feedback',
          ],
          isActive: true,
          displayOrder: 4,
        },
      ])
      .returning()

    console.log(`✓ Created ${plans.length} pricing plans`)

    // 3. Create active placement test
    console.log('Creating placement test...')
    const testQuestions = [
      {
        id: 1,
        question: 'I ___ to work every day.',
        options: { A: 'go', B: 'goes', C: 'going', D: 'went' },
        correctAnswer: 'A',
        difficulty: 'A1',
      },
      {
        id: 2,
        question: 'She ___ a teacher.',
        options: { A: 'am', B: 'is', C: 'are', D: 'be' },
        correctAnswer: 'B',
        difficulty: 'A1',
      },
      {
        id: 3,
        question: 'There ___ many people at the party last night.',
        options: { A: 'is', B: 'was', C: 'were', D: 'are' },
        correctAnswer: 'C',
        difficulty: 'A2',
      },
      {
        id: 4,
        question: 'I have lived here ___ five years.',
        options: { A: 'since', B: 'for', C: 'during', D: 'from' },
        correctAnswer: 'B',
        difficulty: 'A2',
      },
      {
        id: 5,
        question: 'If I ___ you, I would apologize.',
        options: { A: 'am', B: 'was', C: 'were', D: 'be' },
        correctAnswer: 'C',
        difficulty: 'B1',
      },
      {
        id: 6,
        question: 'She suggested ___ to the cinema.',
        options: { A: 'go', B: 'to go', C: 'going', D: 'went' },
        correctAnswer: 'C',
        difficulty: 'B1',
      },
      {
        id: 7,
        question: 'The project ___ by next Friday.',
        options: {
          A: 'will complete',
          B: 'will be completed',
          C: 'will have completed',
          D: 'completes',
        },
        correctAnswer: 'B',
        difficulty: 'B1',
      },
      {
        id: 8,
        question: 'I wish I ___ more time to study.',
        options: { A: 'have', B: 'had', C: 'will have', D: 'would have' },
        correctAnswer: 'B',
        difficulty: 'B2',
      },
      {
        id: 9,
        question:
          'The report, ___ was completed yesterday, needs to be revised.',
        options: { A: 'that', B: 'what', C: 'which', D: 'who' },
        correctAnswer: 'C',
        difficulty: 'B2',
      },
      {
        id: 10,
        question: 'She denied ___ the money.',
        options: { A: 'steal', B: 'to steal', C: 'stealing', D: 'stolen' },
        correctAnswer: 'C',
        difficulty: 'B2',
      },
      {
        id: 11,
        question: 'Had I known about the meeting, I ___ attended.',
        options: { A: 'will have', B: 'would have', C: 'had', D: 'have' },
        correctAnswer: 'B',
        difficulty: 'B2',
      },
      {
        id: 12,
        question: 'The committee ___ on the issue for hours.',
        options: { A: 'has deliberated', B: 'have deliberated', C: 'deliberates', D: 'deliberate' },
        correctAnswer: 'A',
        difficulty: 'C1',
      },
      {
        id: 13,
        question: 'Scarcely ___ arrived when the phone rang.',
        options: { A: 'I had', B: 'had I', C: 'have I', D: 'I have' },
        correctAnswer: 'B',
        difficulty: 'C1',
      },
      {
        id: 14,
        question: 'The proposal was ___ by the board.',
        options: { A: 'turned down', B: 'turned up', C: 'turned in', D: 'turned out' },
        correctAnswer: 'A',
        difficulty: 'C1',
      },
      {
        id: 15,
        question: 'It is imperative that he ___ the deadline.',
        options: { A: 'meets', B: 'meet', C: 'met', D: 'will meet' },
        correctAnswer: 'B',
        difficulty: 'C1',
      },
      {
        id: 16,
        question: 'Were it not for your assistance, we ___ succeeded.',
        options: { A: "wouldn't have", B: "won't have", C: "hadn't", D: "haven't" },
        correctAnswer: 'A',
        difficulty: 'C2',
      },
      {
        id: 17,
        question: 'The ramifications of this decision ___ far-reaching.',
        options: { A: 'is', B: 'are', C: 'was', D: 'been' },
        correctAnswer: 'B',
        difficulty: 'C2',
      },
      {
        id: 18,
        question: 'He was ___ aware of the potential consequences.',
        options: { A: 'acutely', B: 'acute', C: 'acuteness', D: 'acuter' },
        correctAnswer: 'A',
        difficulty: 'C2',
      },
      {
        id: 19,
        question: 'The research ___ new insights into the phenomenon.',
        options: { A: 'yielded', B: 'yield', C: 'yields', D: 'yielding' },
        correctAnswer: 'A',
        difficulty: 'C2',
      },
      {
        id: 20,
        question: 'Notwithstanding the challenges, the team ___ to persevere.',
        options: { A: 'manages', B: 'managed', C: 'managing', D: 'manage' },
        correctAnswer: 'B',
        difficulty: 'C2',
      },
    ]

    const [test] = await db
      .insert(placementTests)
      .values({
        version: 1,
        questions: testQuestions,
        isActive: true,
      })
      .returning()

    console.log('✓ Created placement test (version 1, 20 questions)')

    // 4. Create homepage content
    console.log('Creating homepage content...')
    await db.insert(homepageContent).values({
      headline: 'Master English with L2+ English',
      subtext:
        'Achieve fluency with expert-led classes, personalized learning paths, and real-world practice.',
      step1Text: 'Take our free CEFR-based placement test to assess your current English level.',
      step2Text: 'Choose a course plan that fits your goals and schedule.',
      step3Text: 'Join live online classes with native speakers and start improving immediately.',
      ctaText: 'Get Started Today',
    })

    console.log('✓ Created homepage content')

    // 5. Create about us content
    console.log('Creating about us content...')
    await db.insert(aboutUsContent).values({
      contentHtml: `
        <h2>About L2+ English</h2>
        <p>L2+ English is dedicated to helping learners achieve fluency through immersive, practical English education. Our experienced native-speaking instructors use proven methodologies to deliver engaging, results-driven lessons.</p>
        <p>We specialize in CEFR-aligned curriculum, ensuring every student progresses systematically from A1 (beginner) to C2 (proficient). Our live online classes combine structured learning with real-world conversation practice.</p>
        <h3>Our Approach</h3>
        <ul>
          <li>Small group classes for maximum interaction</li>
          <li>CEFR-based placement testing and level assignment</li>
          <li>Native-speaking instructors with teaching qualifications</li>
          <li>Flexible scheduling to fit your lifestyle</li>
          <li>Comprehensive materials and progress tracking</li>
        </ul>
      `,
      instructorPhotos: [
        {
          name: 'Sarah Johnson',
          photoUrl: '/images/instructors/sarah.jpg',
          bio: 'CELTA-certified instructor with 10+ years of experience teaching English to international students.',
        },
        {
          name: 'Michael Chen',
          photoUrl: '/images/instructors/michael.jpg',
          bio: 'Specializes in business English and exam preparation (IELTS, TOEFL). MA in Applied Linguistics.',
        },
      ],
    })

    console.log('✓ Created about us content')

    // 6. Create demo student
    console.log('Creating demo student...')
    const studentPasswordHash = await hash('Student123!', {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    })

    const [demoUser] = await db
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
      id: demoUser.id,
      selfReportedLevel: 'B1',
      assignedCefrLevel: 'B2',
      paymentStatus: 'active',
      stripeCustomerId: 'cus_demo_student',
    })

    console.log('✓ Demo student created:', demoUser.email)

    // 7. Create demo payment for student
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

    // 8. Create demo test result
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

    // 9. Create demo classes
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
      ])
      .returning()

    console.log(`✓ Created ${demoClasses.length} demo classes`)

    // 10. Enroll demo student in classes
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
    ])

    console.log('✓ Demo student enrolled in 2 classes')

    console.log('\n✅ Database seeded successfully!')
    console.log('\nCredentials:')
    console.log('Admin: admin@l2plusenglish.com / Admin123!')
    console.log('Demo Student: student@demo.com / Student123!')
  } catch (error) {
    console.error('❌ Seed failed:', error)
    throw error
  }
}

seed()
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
  .then(() => {
    process.exit(0)
  })
