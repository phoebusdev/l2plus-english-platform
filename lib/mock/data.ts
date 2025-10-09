/**
 * Mock Data Provider - Enables immediate demo without database
 *
 * This module provides realistic mock data for all entities,
 * allowing the frontend to work immediately while backend is being connected.
 *
 * Usage: Import and use these functions in API routes when database is unavailable
 */

import type { CEFRLevel } from '../utils/cefr'

export const MOCK_ENABLED = process.env.NEXT_PUBLIC_MOCK_MODE === 'true' || !process.env.POSTGRES_URL

// ========== MOCK USERS ==========

export const mockUsers = {
  admin: {
    id: 'admin-mock-id',
    email: 'admin@l2plusenglish.com',
    passwordHash: '$argon2id$v=19$m=19456,t=2,p=1$mock', // Mock hash
    fullName: 'L2+ Admin',
    phone: '+44 20 1234 5678',
    timezone: 'Europe/London',
    role: 'admin' as const,
    emailVerified: true,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  },
  student1: {
    id: 'student1-mock-id',
    email: 'john.doe@example.com',
    passwordHash: '$argon2id$v=19$m=19456,t=2,p=1$mock',
    fullName: 'John Doe',
    phone: '+44 20 9876 5432',
    timezone: 'Europe/London',
    role: 'student' as const,
    emailVerified: true,
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15'),
  },
  student2: {
    id: 'student2-mock-id',
    email: 'jane.smith@example.com',
    passwordHash: '$argon2id$v=19$m=19456,t=2,p=1$mock',
    fullName: 'Jane Smith',
    phone: '+44 20 5555 1234',
    timezone: 'Europe/London',
    role: 'student' as const,
    emailVerified: true,
    createdAt: new Date('2025-01-20'),
    updatedAt: new Date('2025-01-20'),
  },
}

// ========== MOCK STUDENTS ==========

export const mockStudents = {
  student1: {
    id: 'student1-mock-id',
    selfReportedLevel: 'B1' as CEFRLevel,
    assignedCefrLevel: 'B2' as CEFRLevel,
    paymentStatus: 'active',
    stripeCustomerId: 'cus_mock_student1',
    kondeskSyncedAt: new Date('2025-01-15'),
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15'),
  },
  student2: {
    id: 'student2-mock-id',
    selfReportedLevel: 'A2' as CEFRLevel,
    assignedCefrLevel: 'A2' as CEFRLevel,
    paymentStatus: 'none',
    stripeCustomerId: null,
    kondeskSyncedAt: new Date('2025-01-20'),
    createdAt: new Date('2025-01-20'),
    updatedAt: new Date('2025-01-20'),
  },
}

// ========== MOCK PLACEMENT TEST ==========

export const mockPlacementTest = {
  id: 'test-mock-id',
  version: 1,
  isActive: true,
  createdAt: new Date('2025-01-01'),
  updatedAt: new Date('2025-01-01'),
  questions: [
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
      question: 'The report, ___ was completed yesterday, needs to be revised.',
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
  ],
}

// ========== MOCK TEST RESULTS ==========

export const mockTestResults = [
  {
    id: 'result1-mock-id',
    studentId: 'student1-mock-id',
    testId: 'test-mock-id',
    answers: Array(20).fill({ questionId: 1, selectedAnswer: 'A' }), // Simplified
    score: 17,
    percentage: 85,
    assignedLevel: 'B2' as CEFRLevel,
    completedAt: new Date('2025-01-16'),
  },
]

// ========== MOCK PRICING PLANS ==========

export const mockPricingPlans = [
  {
    id: 'plan1-mock-id',
    name: 'Starter Plan',
    description: '1 group class per week',
    priceGbp: 4900, // £49.00
    billingCycle: 'monthly' as const,
    stripePriceId: 'price_mock_starter',
    features: ['4 group classes per month', 'Access to class materials', 'Email support', 'Progress tracking'],
    isActive: true,
    displayOrder: 1,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  },
  {
    id: 'plan2-mock-id',
    name: 'Standard Plan',
    description: '2 group classes per week',
    priceGbp: 8900, // £89.00
    billingCycle: 'monthly' as const,
    stripePriceId: 'price_mock_standard',
    features: [
      '8 group classes per month',
      'Access to class materials',
      'Priority email support',
      'Progress tracking',
      'Monthly 1-on-1 review session',
    ],
    isActive: true,
    displayOrder: 2,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  },
  {
    id: 'plan3-mock-id',
    name: 'Intensive Plan',
    description: '3 group classes per week + materials + feedback',
    priceGbp: 12900, // £129.00
    billingCycle: 'monthly' as const,
    stripePriceId: 'price_mock_intensive',
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
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  },
  {
    id: 'plan4-mock-id',
    name: 'Private 1:1',
    description: '1-to-1 coaching tailored to your goals',
    priceGbp: 19900, // £199.00
    billingCycle: 'one_time' as const,
    stripePriceId: 'price_mock_private',
    features: [
      '4 private 60-minute sessions',
      'Customized lesson plan',
      'Flexible scheduling',
      'Focused skill improvement',
      'Instant feedback',
    ],
    isActive: true,
    displayOrder: 4,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  },
]

// ========== MOCK CLASS SESSIONS ==========

const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
tomorrow.setHours(14, 0, 0, 0)

const nextWeek = new Date()
nextWeek.setDate(nextWeek.getDate() + 7)
nextWeek.setHours(10, 0, 0, 0)

export const mockClassSessions = [
  {
    id: 'class1-mock-id',
    dateTime: tomorrow,
    cefrLevel: 'B2' as CEFRLevel,
    zoomUrl: 'https://zoom.us/j/mock123456?pwd=mock',
    capacity: 10,
    enrollmentCount: 5,
    instructorName: 'Sarah Johnson',
    createdBy: 'admin-mock-id',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  },
  {
    id: 'class2-mock-id',
    dateTime: nextWeek,
    cefrLevel: 'B2' as CEFRLevel,
    zoomUrl: 'https://zoom.us/j/mock789012?pwd=mock',
    capacity: 10,
    enrollmentCount: 3,
    instructorName: 'Michael Chen',
    createdBy: 'admin-mock-id',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  },
]

// ========== MOCK HOMEPAGE CONTENT ==========

export const mockHomepageContent = {
  id: 1,
  headline: 'Master English Online with L2+',
  subtext: 'We offer live English classes online — from beginner to advanced.',
  step1Text: '1. Take your free placement test',
  step2Text: '2. Choose your level and course',
  step3Text: '3. Join live classes on Zoom',
  ctaText: 'Get Started Today',
  updatedAt: new Date('2025-01-01'),
}

// ========== MOCK ABOUT CONTENT ==========

export const mockAboutContent = {
  id: 1,
  contentHtml: `
    <h2>About L2+ English</h2>
    <p>L2+ English is dedicated to helping learners achieve fluency through immersive, practical English education. Our experienced native-speaking instructors use proven methodologies to deliver engaging, results-driven lessons.</p>
    <p>We specialize in CEFR-aligned curriculum, ensuring every student progresses systematically from A1 (beginner) to C2 (proficient).</p>
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
  updatedAt: new Date('2025-01-01'),
}

// ========== HELPER FUNCTIONS ==========

/**
 * Get mock user by email (for authentication)
 */
export function getMockUserByEmail(email: string) {
  return Object.values(mockUsers).find(u => u.email === email) || null
}

/**
 * Get mock student data by user ID
 */
export function getMockStudentByUserId(userId: string) {
  return Object.values(mockStudents).find(s => s.id === userId) || null
}

/**
 * Get mock student with user data
 */
export function getMockStudentWithUser(userId: string) {
  const student = getMockStudentByUserId(userId)
  const user = Object.values(mockUsers).find(u => u.id === userId)

  if (!student || !user) return null

  return {
    ...student,
    user,
  }
}

/**
 * Check if mock mode is enabled
 */
export function isMockMode(): boolean {
  return MOCK_ENABLED
}

/**
 * Format price in GBP (pence to pounds)
 */
export function formatPrice(priceInPence: number): string {
  return `£${(priceInPence / 100).toFixed(2)}`
}
