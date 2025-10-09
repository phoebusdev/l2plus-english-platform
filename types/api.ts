import type {
  User,
  Student,
  TestResult,
  PricingPlan,
  Payment,
  ClassSession,
  CEFRLevel,
  PaymentStatus,
} from './database'

// API Response types

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  details?: unknown
}

export interface RegisterResponse {
  userId: string
  email: string
  message: string
}

export interface LoginResponse {
  user: {
    id: string
    email: string
    name: string
    role: 'student' | 'admin'
  }
}

export interface DashboardResponse {
  student: Student & { user: User }
  cefrLevel: CEFRLevel | null
  paymentStatus: PaymentStatus
  lastTestResult: TestResult | null
  canRetakeTest: boolean
  nextTestDate: Date | null
  upcomingClasses: ClassSession[]
}

export interface TestEligibilityResponse {
  eligible: boolean
  reason?: string
  lastTestDate?: Date
  nextAvailableDate?: Date
}

export interface StartTestResponse {
  testId: string
  questions: Array<{
    id: number
    question: string
    options: {
      A: string
      B: string
      C: string
      D: string
    }
    // correctAnswer is NOT included in response
  }>
}

export interface SubmitTestResponse {
  testResultId: string
  score: number
  percentage: number
  assignedLevel: CEFRLevel
  message: string
}

export interface PaymentStatusResponse {
  status: PaymentStatus
  planName?: string
  currentPeriodEnd?: Date
  gracePeriodEndsAt?: Date
  stripeCustomerId?: string
}

export interface ClassListResponse {
  classes: ClassSession[]
  total: number
}

export interface MaterialsResponse {
  materials: Array<{
    id: string
    filename: string
    downloadUrl: string
    fileSizeBytes: number
    uploadedAt: Date
  }>
}

export interface CheckoutSessionResponse {
  url: string
  sessionId: string
}

export interface PricingPlansResponse {
  plans: PricingPlan[]
}

// Admin API types

export interface AdminStudentsListResponse {
  students: Array<Student & { user: User }>
  total: number
}

export interface AdminStudentDetailsResponse {
  student: Student & { user: User }
  testResults: TestResult[]
  payments: Payment[]
  enrollments: number
}

export interface AdminClassListResponse {
  classes: ClassSession[]
  total: number
}

export interface ExportDataResponse {
  data: string // CSV or Excel data
  filename: string
  mimeType: string
}

// Pagination types

export interface PaginationParams {
  limit?: number
  offset?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  limit: number
  offset: number
  hasMore: boolean
}

// Filter types

export interface StudentFilters {
  paymentStatus?: PaymentStatus
  cefrLevel?: CEFRLevel
  search?: string
}

export interface ClassFilters {
  cefrLevel?: CEFRLevel
  fromDate?: Date
  toDate?: Date
}
