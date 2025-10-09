import { pgTable, uuid, varchar, text, timestamp, boolean, pgEnum, jsonb, integer, index, uniqueIndex } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// ========== ENUMS ==========

export const roleEnum = pgEnum('role', ['student', 'admin'])

export const cefrLevelEnum = pgEnum('cefr_level', ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'])

export const paymentStatusEnum = pgEnum('payment_status', [
  'none',
  'active',
  'pending',
  'failed',
  'cancelled',
])

export const billingCycleEnum = pgEnum('billing_cycle', ['monthly', 'one_time'])

export const emailTypeEnum = pgEnum('email_type', [
  'registration_confirmation',
  'test_result',
  'class_reminder_24h',
  'payment_success',
  'payment_failed',
  'subscription_cancelled',
  'kondesk_registration',
])

export const emailStatusEnum = pgEnum('email_status', ['sent', 'failed'])

// ========== CORE TABLES ==========

export const users = pgTable(
  'users',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),
    fullName: varchar('full_name', { length: 255 }).notNull(),
    phone: varchar('phone', { length: 50 }).notNull(),
    timezone: varchar('timezone', { length: 100 }).notNull(),
    role: roleEnum('role').default('student').notNull(),
    emailVerified: boolean('email_verified').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  table => ({
    emailIdx: uniqueIndex('users_email_idx').on(table.email),
    roleIdx: index('users_role_idx').on(table.role),
  })
)

export const students = pgTable(
  'students',
  {
    id: uuid('id')
      .primaryKey()
      .references(() => users.id, { onDelete: 'cascade' }),
    selfReportedLevel: cefrLevelEnum('self_reported_level'),
    assignedCefrLevel: cefrLevelEnum('assigned_cefr_level'),
    paymentStatus: paymentStatusEnum('payment_status').default('none').notNull(),
    stripeCustomerId: varchar('stripe_customer_id', { length: 255 }).unique(),
    kondeskSyncedAt: timestamp('kondesk_synced_at'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  table => ({
    paymentStatusIdx: index('students_payment_status_idx').on(table.paymentStatus),
    cefrLevelIdx: index('students_cefr_level_idx').on(table.assignedCefrLevel),
    stripeCustomerIdx: index('students_stripe_customer_idx').on(table.stripeCustomerId),
  })
)

export const placementTests = pgTable(
  'placement_tests',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    version: integer('version').unique().notNull(),
    questions: jsonb('questions').notNull(), // Array of question objects with correct answers
    isActive: boolean('is_active').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  table => ({
    versionIdx: uniqueIndex('placement_tests_version_idx').on(table.version),
    activeIdx: index('placement_tests_active_idx').on(table.isActive),
  })
)

export const testResults = pgTable(
  'test_results',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    studentId: uuid('student_id')
      .references(() => students.id, { onDelete: 'cascade' })
      .notNull(),
    testId: uuid('test_id')
      .references(() => placementTests.id)
      .notNull(),
    answers: jsonb('answers').notNull(), // Array of {question_id, selected_answer}
    score: integer('score').notNull(), // Number correct out of 20
    percentage: integer('percentage').notNull(), // Score as percentage (0-100)
    assignedLevel: cefrLevelEnum('assigned_level').notNull(),
    completedAt: timestamp('completed_at').defaultNow().notNull(),
  },
  table => ({
    studentCompletedIdx: index('test_results_student_completed_idx').on(
      table.studentId,
      table.completedAt
    ),
    levelIdx: index('test_results_level_idx').on(table.assignedLevel),
  })
)

export const pricingPlans = pgTable(
  'pricing_plans',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    description: text('description').notNull(),
    priceGbp: integer('price_gbp').notNull(), // Price in pence (e.g., 4900 = £49.00)
    billingCycle: billingCycleEnum('billing_cycle').notNull(),
    stripePriceId: varchar('stripe_price_id', { length: 255 }).unique().notNull(),
    features: jsonb('features').notNull(), // Array of feature strings
    isActive: boolean('is_active').default(true).notNull(),
    displayOrder: integer('display_order').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  table => ({
    stripePriceIdx: uniqueIndex('pricing_plans_stripe_price_idx').on(table.stripePriceId),
    activeDisplayIdx: index('pricing_plans_active_display_idx').on(
      table.isActive,
      table.displayOrder
    ),
  })
)

export const payments = pgTable(
  'payments',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    studentId: uuid('student_id')
      .references(() => students.id, { onDelete: 'cascade' })
      .notNull(),
    planId: uuid('plan_id')
      .references(() => pricingPlans.id)
      .notNull(),
    stripeCustomerId: varchar('stripe_customer_id', { length: 255 }).notNull(),
    stripeSubscriptionId: varchar('stripe_subscription_id', { length: 255 }),
    stripePaymentIntentId: varchar('stripe_payment_intent_id', { length: 255 }),
    status: paymentStatusEnum('status').default('pending').notNull(),
    currentPeriodStart: timestamp('current_period_start'),
    currentPeriodEnd: timestamp('current_period_end'),
    cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false).notNull(),
    failedAt: timestamp('failed_at'),
    gracePeriodEndsAt: timestamp('grace_period_ends_at'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  table => ({
    customerIdx: index('payments_stripe_customer_idx').on(table.stripeCustomerId),
    subscriptionIdx: index('payments_stripe_subscription_idx').on(table.stripeSubscriptionId),
    statusGraceIdx: index('payments_status_grace_idx').on(table.status, table.gracePeriodEndsAt),
  })
)

export const classSessions = pgTable(
  'class_sessions',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    dateTime: timestamp('date_time').notNull(),
    cefrLevel: cefrLevelEnum('cefr_level').notNull(),
    zoomUrl: varchar('zoom_url', { length: 500 }).notNull(),
    capacity: integer('capacity').notNull(),
    enrollmentCount: integer('enrollment_count').default(0).notNull(),
    instructorName: varchar('instructor_name', { length: 255 }),
    createdBy: uuid('created_by')
      .references(() => users.id)
      .notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  table => ({
    dateTimeLevelIdx: index('class_sessions_datetime_level_idx').on(
      table.dateTime,
      table.cefrLevel
    ),
    levelIdx: index('class_sessions_level_idx').on(table.cefrLevel),
  })
)

export const enrollments = pgTable(
  'enrollments',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    studentId: uuid('student_id')
      .references(() => students.id, { onDelete: 'cascade' })
      .notNull(),
    classSessionId: uuid('class_session_id')
      .references(() => classSessions.id, { onDelete: 'cascade' })
      .notNull(),
    enrolledAt: timestamp('enrolled_at').defaultNow().notNull(),
    attended: boolean('attended').default(false).notNull(),
  },
  table => ({
    studentClassUnique: uniqueIndex('enrollments_student_class_unique').on(
      table.studentId,
      table.classSessionId
    ),
    classSessionIdx: index('enrollments_class_session_idx').on(table.classSessionId),
  })
)

export const classMaterials = pgTable(
  'class_materials',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    classSessionId: uuid('class_session_id')
      .references(() => classSessions.id, { onDelete: 'cascade' })
      .notNull(),
    filename: varchar('filename', { length: 255 }).notNull(),
    filePath: varchar('file_path', { length: 500 }).notNull(),
    fileSizeBytes: integer('file_size_bytes').notNull(),
    mimeType: varchar('mime_type', { length: 100 }).notNull(),
    uploadedBy: uuid('uploaded_by')
      .references(() => users.id)
      .notNull(),
    uploadedAt: timestamp('uploaded_at').defaultNow().notNull(),
  },
  table => ({
    classSessionIdx: index('class_materials_class_session_idx').on(table.classSessionId),
  })
)

export const homepageContent = pgTable('homepage_content', {
  id: integer('id').default(1).primaryKey(),
  headline: varchar('headline', { length: 255 }).notNull(),
  subtext: text('subtext').notNull(),
  step1Text: text('step1_text').notNull(),
  step2Text: text('step2_text').notNull(),
  step3Text: text('step3_text').notNull(),
  ctaText: varchar('cta_text', { length: 100 }).notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const aboutUsContent = pgTable('about_us_content', {
  id: integer('id').default(1).primaryKey(),
  contentHtml: text('content_html').notNull(),
  instructorPhotos: jsonb('instructor_photos').notNull(), // Array of {name, photo_url, bio}
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const emailLog = pgTable(
  'email_log',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    recipient: varchar('recipient', { length: 255 }).notNull(),
    emailType: emailTypeEnum('email_type').notNull(),
    subject: varchar('subject', { length: 255 }).notNull(),
    status: emailStatusEnum('status').notNull(),
    resendMessageId: varchar('resend_message_id', { length: 255 }),
    errorMessage: text('error_message'),
    metadata: jsonb('metadata'), // Additional context like student_id, test_id, etc.
    sentAt: timestamp('sent_at').defaultNow().notNull(),
  },
  table => ({
    recipientSentIdx: index('email_log_recipient_sent_idx').on(table.recipient, table.sentAt),
    typeStatusSentIdx: index('email_log_type_status_sent_idx').on(
      table.emailType,
      table.status,
      table.sentAt
    ),
  })
)

// ========== RELATIONS ==========

export const usersRelations = relations(users, ({ one }) => ({
  student: one(students, {
    fields: [users.id],
    references: [students.id],
  }),
}))

export const studentsRelations = relations(students, ({ one, many }) => ({
  user: one(users, {
    fields: [students.id],
    references: [users.id],
  }),
  testResults: many(testResults),
  payments: many(payments),
  enrollments: many(enrollments),
}))

export const placementTestsRelations = relations(placementTests, ({ many }) => ({
  testResults: many(testResults),
}))

export const testResultsRelations = relations(testResults, ({ one }) => ({
  student: one(students, {
    fields: [testResults.studentId],
    references: [students.id],
  }),
  test: one(placementTests, {
    fields: [testResults.testId],
    references: [placementTests.id],
  }),
}))

export const pricingPlansRelations = relations(pricingPlans, ({ many }) => ({
  payments: many(payments),
}))

export const paymentsRelations = relations(payments, ({ one }) => ({
  student: one(students, {
    fields: [payments.studentId],
    references: [students.id],
  }),
  plan: one(pricingPlans, {
    fields: [payments.planId],
    references: [pricingPlans.id],
  }),
}))

export const classSessionsRelations = relations(classSessions, ({ one, many }) => ({
  creator: one(users, {
    fields: [classSessions.createdBy],
    references: [users.id],
  }),
  enrollments: many(enrollments),
  materials: many(classMaterials),
}))

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  student: one(students, {
    fields: [enrollments.studentId],
    references: [students.id],
  }),
  classSession: one(classSessions, {
    fields: [enrollments.classSessionId],
    references: [classSessions.id],
  }),
}))

export const classMaterialsRelations = relations(classMaterials, ({ one }) => ({
  classSession: one(classSessions, {
    fields: [classMaterials.classSessionId],
    references: [classSessions.id],
  }),
  uploader: one(users, {
    fields: [classMaterials.uploadedBy],
    references: [users.id],
  }),
}))
