import type { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import type {
  users,
  students,
  placementTests,
  testResults,
  pricingPlans,
  payments,
  classSessions,
  enrollments,
  classMaterials,
  homepageContent,
  aboutUsContent,
  emailLog,
} from '@/lib/db/schema'

// Select types (database records)
export type User = InferSelectModel<typeof users>
export type Student = InferSelectModel<typeof students>
export type PlacementTest = InferSelectModel<typeof placementTests>
export type TestResult = InferSelectModel<typeof testResults>
export type PricingPlan = InferSelectModel<typeof pricingPlans>
export type Payment = InferSelectModel<typeof payments>
export type ClassSession = InferSelectModel<typeof classSessions>
export type Enrollment = InferSelectModel<typeof enrollments>
export type ClassMaterial = InferSelectModel<typeof classMaterials>
export type HomepageContent = InferSelectModel<typeof homepageContent>
export type AboutUsContent = InferSelectModel<typeof aboutUsContent>
export type EmailLog = InferSelectModel<typeof emailLog>

// Insert types (for creating new records)
export type NewUser = InferInsertModel<typeof users>
export type NewStudent = InferInsertModel<typeof students>
export type NewPlacementTest = InferInsertModel<typeof placementTests>
export type NewTestResult = InferInsertModel<typeof testResults>
export type NewPricingPlan = InferInsertModel<typeof pricingPlans>
export type NewPayment = InferInsertModel<typeof payments>
export type NewClassSession = InferInsertModel<typeof classSessions>
export type NewEnrollment = InferInsertModel<typeof enrollments>
export type NewClassMaterial = InferInsertModel<typeof classMaterials>
export type NewEmailLog = InferInsertModel<typeof emailLog>

// Enum types
export type Role = 'student' | 'admin'
export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
export type PaymentStatus = 'none' | 'active' | 'pending' | 'failed' | 'cancelled'
export type BillingCycle = 'monthly' | 'one_time'
export type EmailType =
  | 'registration_confirmation'
  | 'test_result'
  | 'class_reminder_24h'
  | 'payment_success'
  | 'payment_failed'
  | 'subscription_cancelled'
  | 'kondesk_registration'
export type EmailStatus = 'sent' | 'failed'

// Composite types
export type StudentWithUser = Student & { user: User }
export type TestResultWithDetails = TestResult & {
  student: StudentWithUser
  test: PlacementTest
}
export type PaymentWithDetails = Payment & {
  student: StudentWithUser
  plan: PricingPlan
}
export type ClassSessionWithDetails = ClassSession & {
  enrollments: Enrollment[]
  materials: ClassMaterial[]
}
export type EnrollmentWithDetails = Enrollment & {
  student: StudentWithUser
  classSession: ClassSession
}
