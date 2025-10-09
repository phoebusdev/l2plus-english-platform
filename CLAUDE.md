# CLAUDE.md - L2+ English Language Learning Platform

This file provides guidance to Claude Code when working with the L2+ English platform codebase.

## Project Overview

L2+ English is an online English language learning platform with:
- Student registration and CEFR-based placement testing
- Stripe payment integration for course subscriptions
- Live Zoom class access and management
- Admin panel for managing students, classes, and content
- Automated email notifications via Resend API
- Kondesk CRM integration

**Project Type**: Web application (Next.js full-stack)
**Repository**: `/home/henri/vibe-coding/projects/l2plus-english`
**Specification**: `/home/henri/vibe-coding/specs/006-build-l2-english/`

## Technology Stack

### Core Framework
- **Next.js 14+** with App Router
- **React 18+** with Server Components
- **TypeScript 5.3+** for type safety
- **Node.js 20 LTS**

### Authentication & Authorization
- **NextAuth.js v5** (Auth.js) for authentication
- **JWT sessions** (not database sessions) for Edge compatibility
- **Argon2id password hashing** (@node-rs/argon2)
- **Multi-layer RBAC** (student/admin roles)

### Database & ORM
- **Vercel Postgres** (PostgreSQL 16+)
- **Drizzle ORM** (type-safe, 7.4kb bundle)
- **pg** with connection pooling via @vercel/functions
- **Drizzle Kit** for migrations

### Payment Processing
- **Stripe SDK** for payments and subscriptions
- **Stripe Checkout** for payment flow
- **Stripe Smart Retries** for failed payments
- **Webhooks** for event processing (invoice.paid, invoice.payment_failed, customer.subscription.deleted)

### Email System
- **Resend API** for transactional emails
- **React Email** for email templates
- **Automated notifications** for registration, test results, payment events, class reminders

### File Storage
- **Vercel Blob** for PDF uploads (class materials)
- **10MB max file size**, PDF-only uploads

### UI & Styling
- **Tailwind CSS 4** utility-first styling
- **shadcn/ui** component library
- **Lightweight design** (no heavy animations per client requirement)
- **Mobile-responsive** (320px minimum width)

### Design System Standards

**IMPORTANT**: This project follows strict design system standards to maintain visual consistency and professional appearance. See `DESIGN_SYSTEM.md` for comprehensive reference.

#### Critical Rules (Must Follow)
1. **Spacing Scale** - Use systematic 4px increments only:
   - `space-1` (4px), `space-2` (8px), `space-3` (12px), `space-6` (24px), `space-8` (32px), `space-12` (48px), `space-16` (64px)
   - Section padding: `py-16 md:py-24` (regular), `py-20 md:py-32` (hero)
   - Section header margin: `mb-12`
   - Card padding: `p-6` (uniform)
   - Form field spacing: `space-y-6`
   - Grid gaps: `gap-6`

2. **Typography** - Maximum 2-3 responsive breakpoints per element:
   - Headings: `font-poppins` (600-800 weight)
   - Body text: `font-inter` (400-600 weight)
   - Example: `text-4xl md:text-5xl lg:text-6xl` (3 breakpoints max)
   - Never use 4+ breakpoints like `text-4xl sm:text-5xl md:text-6xl lg:text-7xl`

3. **Dark Theme** - Default and consistent:
   - Background: `bg-gray-900` (primary), `bg-gray-800` (cards/sections)
   - Text: `text-white` (headings), `text-gray-100` (body)
   - Borders: `border-gray-700`
   - Never mix light theme elements into dark theme pages

4. **Colors** - Use semantic color variables only:
   - Primary: `bg-primary`, `text-primary`, `border-primary`
   - Secondary: `bg-secondary`, `text-secondary`
   - Accent: `bg-accent`, `text-accent`
   - Never use hardcoded colors like `bg-red-500` or `text-blue-400`

#### Component Patterns

**Button Variants**:
```tsx
// Primary action (most important)
<Button className="bg-primary hover:bg-primary-hover">

// Secondary action
<Button className="bg-secondary hover:bg-secondary-hover">

// Outline (less prominent)
<Button variant="outline" className="border-2 border-white bg-white/5">
```

**Card Pattern**:
```tsx
<Card className="border-2 border-gray-700 hover:border-primary/30 bg-gray-800">
  <CardHeader className="p-6">
    <CardTitle className="font-poppins text-2xl font-bold text-white">
  </CardHeader>
  <CardContent className="p-6">
</Card>
```

**Form Pattern**:
```tsx
<form className="space-y-6">
  <div className="space-y-2">
    <Label htmlFor="field">Label</Label>
    <Input id="field" />
    <p className="text-xs text-muted-foreground">Helper text</p>
  </div>
</form>
```

**Section Pattern**:
```tsx
<section className="py-16 md:py-24 px-4 bg-gray-900">
  <div className="container mx-auto max-w-6xl">
    <div className="text-center mb-12">
      <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-6 text-white">
        Section Title
      </h2>
      <p className="font-inter text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
        Section description
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Cards */}
    </div>
  </div>
</section>
```

#### Anti-Patterns (Never Do This)
- ❌ Random spacing: `mb-3`, `mb-5`, `mb-7`, `mb-9`, `mb-10`, `mb-14`
- ❌ Excessive breakpoints: `text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl`
- ❌ Inconsistent card padding: `pt-8 pb-6`, `p-5`, `px-6 py-4`
- ❌ Mixed form spacing: `space-y-2` in one form, `space-y-4` in another
- ❌ Hardcoded colors: `bg-red-500`, `text-blue-400`, `border-green-300`
- ❌ Theme mixing: Light theme cards on dark backgrounds
- ❌ Scale transforms on grid items: `scale-105` breaks alignment
- ❌ Heavy animations: No `animate-bounce`, `animate-spin` on page elements

#### Quick Reference
- **Section spacing**: `py-16 md:py-24` (regular), `py-20 md:py-32` (hero)
- **Card padding**: `p-6` (all cards, uniform)
- **Form spacing**: `space-y-6` (between fields), `space-y-2` (within field group)
- **Grid gaps**: `gap-6` (consistent across all grids)
- **Button spacing**: `gap-4` in button groups
- **Margins**: Use `mb-6`, `mb-8`, `mb-12`, `mb-16` only
- **Max width**: `max-w-6xl` (sections), `max-w-2xl` (text content), `max-w-4xl` (prose)

#### WCAG AA Compliance
All color combinations meet WCAG AA standards:
- Text contrast ratio: ≥ 4.5:1 (body text), ≥ 3:1 (headings/UI)
- Focus indicators: 2px solid ring with `ring-offset-2`
- Touch targets: Minimum 44×44px (buttons use `py-6` for adequate height)

#### When Adding New Components
1. Check DESIGN_SYSTEM.md for existing patterns first
2. Use semantic color variables (`primary`, `secondary`, `accent`)
3. Follow spacing scale (4/6/8/12/16px increments)
4. Limit typography to 2-3 breakpoints
5. Test on mobile (320px width minimum)
6. Verify WCAG AA contrast with design tokens
7. Keep animations lightweight (transitions only, no heavy animations)

### Validation & Type Safety
- **Zod** for schema validation
- **Type-safe API routes** with Zod schemas
- **Type-safe database queries** with Drizzle

### Testing
- **Vitest** for unit tests
- **Playwright** for E2E tests
- **Testing Library** for component tests

### Deployment & Hosting
- **Vercel** for hosting and deployment
- **Vercel Serverless Functions** for API routes
- **Vercel Edge Network** for global CDN
- **Vercel Analytics** for monitoring

## Project Structure

```
l2plus-english/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth routes (login, register)
│   ├── (public)/                 # Public pages (homepage, about, pricing)
│   ├── (student)/                # Student dashboard and features
│   ├── (admin)/                  # Admin panel
│   ├── api/                      # API routes
│   │   ├── auth/[...nextauth]/   # NextAuth.js
│   │   ├── webhooks/stripe/      # Stripe webhooks
│   │   ├── test/                 # Placement test endpoints
│   │   ├── classes/              # Class management
│   │   └── admin/                # Admin API endpoints
│   └── layout.tsx                # Root layout
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── forms/                    # Form components
│   ├── auth/                     # Auth-related components
│   ├── dashboard/                # Dashboard widgets
│   └── admin/                    # Admin-specific components
├── lib/
│   ├── db/                       # Database client & queries
│   │   ├── schema.ts             # Drizzle schema
│   │   ├── index.ts              # Database connection
│   │   └── seed.ts               # Seed script
│   ├── auth/                     # NextAuth configuration
│   ├── stripe/                   # Stripe helpers
│   ├── email/                    # Email templates & sender
│   ├── validation/               # Zod schemas
│   ├── utils/                    # Utility functions
│   └── constants/                # Constants & types
├── types/
│   ├── database.ts               # Database types
│   ├── api.ts                    # API types
│   └── index.ts                  # Exported types
├── public/
│   ├── uploads/                  # Class materials (PDFs)
│   └── images/                   # Images, logos
├── tests/
│   ├── unit/                     # Unit tests
│   ├── integration/              # API integration tests
│   └── e2e/                      # E2E tests
└── drizzle/                      # Drizzle migrations

## Commands

### Development
- `npm run dev` - Start development server (localhost:3000)
- `npm run build` - Build for production
- `npm run start` - Start production server locally
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - TypeScript type checking

### Database
- `npm run db:generate` - Generate Drizzle migration from schema
- `npm run db:migrate` - Apply migrations to database
- `npm run db:studio` - Open Drizzle Studio (GUI)
- `npm run db:seed` - Seed initial data (admin user, pricing plans, test questions)

### Testing
- `npm run test` - Run unit tests (Vitest)
- `npm run test:watch` - Run tests in watch mode
- `npm run test:integration` - Run API integration tests
- `npm run test:e2e` - Run E2E tests (Playwright)
- `npm run test:e2e:ui` - Run E2E tests with UI

### Stripe Webhook Testing
- `stripe listen --forward-to localhost:3000/api/webhooks/stripe` - Forward webhooks to local server
- `stripe trigger invoice.paid` - Trigger test event
- `stripe trigger invoice.payment_failed` - Trigger payment failure
- `stripe trigger customer.subscription.deleted` - Trigger cancellation

### Deployment
- `vercel` - Deploy to preview
- `vercel --prod` - Deploy to production

## Key Architecture Decisions

### Why NextAuth.js v5 (Auth.js)?
- Modern authentication library with Edge Runtime support
- Built-in JWT session management (no database required for sessions)
- Automatic CSRF protection
- Type-safe with TypeScript

### Why JWT Sessions instead of Database Sessions?
- **Edge-compatible**: Works with Vercel Edge Runtime
- **Cost-effective**: No database queries for every request
- **Scalable**: No session table to manage
- **Fast**: Session data in cookie, no DB lookup

### Why Drizzle ORM instead of Prisma?
- **Lightweight**: 7.4kb vs Prisma's larger bundle
- **SQL-like syntax**: Easier for developers familiar with SQL
- **Type-safe**: Full TypeScript support
- **Fast**: Better performance for serverless environments
- **Migrations**: Simple migration workflow with Drizzle Kit

### Why Argon2id instead of bcrypt?
- **Memory-hard**: Resistant to GPU/ASIC attacks (2025 threat model)
- **Modern**: Latest OWASP recommendations
- **Fast native binding**: @node-rs/argon2 is Rust-based, very fast
- **Configurable**: Fine-tune memory/time cost for security/performance balance

### Why Stripe Checkout instead of Payment Intents?
- **Simpler integration**: Hosted checkout page, less frontend code
- **Mobile-optimized**: Works seamlessly on all devices
- **PCI compliance**: Stripe handles card data, reduces compliance burden
- **Built-in features**: Tax calculation, promo codes, Apple Pay/Google Pay

### Why Vercel Blob instead of Local Filesystem?
- **Serverless-friendly**: No persistent filesystem in Vercel functions
- **CDN-backed**: Fast global delivery of PDFs
- **Scalable**: No storage limits (pay-as-you-go)
- **Secure**: Signed URLs for authenticated downloads

## Database Schema Overview

### Core Entities
- **users** - Base authentication (email, password_hash, full_name, phone, timezone, role)
- **students** - Extended profile (self_reported_level, assigned_cefr_level, payment_status)
- **placement_tests** - Test questions and configuration
- **test_results** - Student test attempts and scores
- **pricing_plans** - Subscription plans (linked to Stripe)
- **payments** - Payment records and subscription status
- **class_sessions** - Scheduled Zoom classes
- **enrollments** - Many-to-many: students ↔ classes
- **class_materials** - PDF materials for classes
- **homepage_content** - Editable homepage content (singleton)
- **about_us_content** - Editable About Us content (singleton)
- **email_log** - Audit log for all transactional emails

### Key Relationships
- User (1) ← (1) Student (one-to-one via FK on student.id → user.id)
- Student (1) → (many) TestResult
- Student (1) → (many) Payment
- Student (many) ↔ (many) ClassSession via Enrollment
- ClassSession (1) → (many) ClassMaterial
- PricingPlan (1) → (many) Payment

## Important Business Logic

### CEFR Level Assignment
Placement test scoring uses percentage bands:
- 0-33%: A1 (Beginner)
- 34-50%: A2 (Elementary)
- 51-66%: B1 (Intermediate)
- 67-83%: B2 (Upper Intermediate)
- 84-91%: C1 (Advanced)
- 92-100%: C2 (Proficient)

### Test Retake Restriction
Students can retake the placement test after **7 days** from last completion.
- Enforced by querying `test_results.completed_at` timestamp
- UI shows "Next test available on [date]" if within cooldown

### Payment Grace Period
When a recurring payment fails:
1. Payment status → `failed`
2. Grace period starts: **3 days** from failure
3. Student retains access during grace period
4. Stripe Smart Retries automatically retry payment
5. If payment succeeds during grace period: status → `active`
6. If grace period expires: status → `cancelled`, access revoked

### Class Enrollment Rules
- Students can only enroll in classes matching their **assigned_cefr_level**
- Enrollment only allowed if `enrollment_count < capacity`
- One student cannot enroll in the same class twice (unique constraint)

### Admin vs Student Access
- **Students** can:
  - Take placement test (once every 7 days)
  - View upcoming classes for their level
  - Enroll in classes (if payment_status = 'active')
  - Download class materials (if enrolled)
  - View test result history
  - Manage payment method (via Stripe portal)

- **Admins** can:
  - Manage all students (view, edit CEFR level)
  - Create/edit/delete class sessions
  - Upload class materials
  - Update homepage/About Us content
  - Edit pricing plan descriptions
  - Update placement test questions
  - Export data (CSV/Excel)
  - View email logs and payment analytics

## Environment Variables

### Required for Development
```bash
# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>

# Database (Vercel Postgres)
POSTGRES_URL=<vercel-postgres-connection-string>
POSTGRES_PRISMA_URL=<vercel-postgres-prisma-url>
POSTGRES_URL_NON_POOLING=<vercel-postgres-non-pooling-url>

# Stripe (use test keys for development)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_... # From `stripe listen`

# Resend Email API
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Kondesk CRM (Optional)
KONDESK_WEBHOOK_URL=<kondesk-webhook-endpoint>
KONDESK_EMAIL=admin@yourdomain.com

# App Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
DEFAULT_CLASS_CAPACITY=10
```

### Production-Only Variables
- Use **production Stripe keys** (not test keys)
- Set `NEXTAUTH_URL` to production domain (e.g., `https://l2plusenglish.com`)
- Verify `RESEND_FROM_EMAIL` uses verified domain

## Coding Conventions

### File Naming
- **React components**: PascalCase (e.g., `StudentDashboard.tsx`)
- **API routes**: lowercase with hyphens (e.g., `route.ts` in `app/api/test/start/route.ts`)
- **Utility functions**: camelCase (e.g., `calculateCEFRLevel.ts`)
- **Types**: PascalCase (e.g., `Student.ts`, `TestResult.ts`)

### Component Structure
- Use **Server Components** by default (faster initial load)
- Add `"use client"` only when needed (forms, interactive elements)
- Co-locate components with their routes when route-specific

### API Route Structure
```typescript
// Example: app/api/test/submit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { submitTestSchema } from '@/lib/validation/test';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  // 1. Authenticate
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Validate input
  const body = await request.json();
  const validation = submitTestSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: 'Validation failed', details: validation.error }, { status: 400 });
  }

  // 3. Business logic
  try {
    const result = await processTestSubmission(validation.data, session.user.id);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Test submission error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### Error Handling
- **API routes**: Return structured JSON errors with appropriate status codes
- **Server components**: Use Next.js error boundaries (`error.tsx`)
- **Client components**: Use React Error Boundaries
- **Database errors**: Log to console, return generic "Internal server error" to client (don't expose schema)

### Type Safety
- All API routes must have corresponding Zod schemas in `lib/validation/`
- All database queries use Drizzle types (no `any` types)
- Use TypeScript strict mode (`strict: true` in tsconfig.json)

## Security Best Practices

### Authentication
- All API routes must check `getServerSession()` for authentication
- Admin routes must additionally check `session.user.role === 'admin'`
- Use middleware for route protection where appropriate

### Input Validation
- Always validate user input with Zod schemas
- Sanitize file uploads (validate MIME type, extension, file size)
- Never trust client-side validation alone

### Database Queries
- Use parameterized queries (Drizzle handles this automatically)
- Never concatenate user input into SQL strings
- Limit query results (pagination) to prevent data exfiltration

### Stripe Webhooks
- Always verify webhook signature using `stripe.webhooks.constructEvent()`
- Use idempotency keys for webhook processing
- Log all webhook events for audit trail

### Email Security
- Use Resend's DKIM/SPF verified domains
- Never send passwords or sensitive data in emails
- Rate-limit email sending to prevent abuse

### File Uploads
- Restrict to PDF only (check MIME type and extension)
- Enforce 10MB file size limit
- Use signed URLs for authenticated downloads
- Scan files for malware if possible (consider integrating file scanning service)

## Performance Optimization

### Database Queries
- Use indexes on frequently queried columns (see `data-model.md`)
- Implement connection pooling with `@vercel/functions`
- Use `db.query` for relational queries (Drizzle Relational Queries)
- Avoid N+1 queries (use eager loading with `.with()`)

### Caching Strategy
- Cache public pages (homepage, about, pricing) at edge with `export const revalidate = 3600` (1 hour)
- Cache Stripe product data in memory (refresh every 5 minutes)
- Use Vercel KV for session data caching if needed

### Images & Assets
- Use Next.js `<Image>` component for automatic optimization
- Store instructor photos in `public/images/` (served via CDN)
- Use WebP format for images when possible

### API Routes
- Keep API routes lightweight (< 500ms p95 latency)
- Offload heavy computations to background jobs if needed
- Use streaming responses for large data exports

## Common Tasks

### Add a New API Endpoint
1. Create route file: `app/api/[endpoint]/route.ts`
2. Add Zod schema: `lib/validation/[schema].ts`
3. Implement handler with authentication check
4. Add integration test: `tests/integration/api/[endpoint].test.ts`
5. Update API spec: `specs/006-build-l2-english/contracts/api-spec.yaml`

### Add a New Database Table
1. Update Drizzle schema: `lib/db/schema.ts`
2. Generate migration: `npm run db:generate`
3. Review migration file in `drizzle/` directory
4. Apply migration: `npm run db:migrate`
5. Update seed script if needed: `lib/db/seed.ts`
6. Update types: Export types from `types/database.ts`

### Add a New Email Template
1. Create React Email template: `lib/email/templates/[TemplateName].tsx`
2. Add email type to `email_type` enum in `lib/db/schema.ts`
3. Create sender function: `lib/email/send-[template-name].ts`
4. Log email in `email_log` table
5. Test locally using Resend test mode

### Update Placement Test Questions
1. Login as admin
2. Navigate to Admin → Test Management
3. Update questions (must have exactly 20)
4. Save (creates new test version)
5. New version automatically becomes active

### Export Student Data
1. Login as admin
2. Navigate to Admin → Export
3. Select data type (students, payments, tests, classes, enrollments)
4. Choose format (CSV or Excel)
5. Download file

## Testing Strategy

### Unit Tests (Vitest)
- Test utility functions: `lib/utils/*.ts`
- Test validators: `lib/validation/*.ts`
- Test CEFR level calculation logic
- Test grace period calculation

### Integration Tests
- Test API routes end-to-end
- Mock external services (Stripe, Resend)
- Use test database (separate from development)

### E2E Tests (Playwright)
- Student registration flow
- Placement test completion
- Payment checkout flow (using Stripe test mode)
- Admin CRUD operations
- Class enrollment

### Manual Testing Checklist
Before each release:
- ✓ Student can register and login
- ✓ Placement test loads and submits correctly
- ✓ CEFR level assigned correctly
- ✓ Payment flow completes (test mode)
- ✓ Class enrollment works
- ✓ Class materials download (PDFs)
- ✓ Admin can create/edit/delete classes
- ✓ Admin can update content (homepage, about)
- ✓ Emails are sent correctly
- ✓ Stripe webhooks process correctly

## Troubleshooting

### Common Issues

**Database connection timeout**
- Check Vercel Postgres database is not paused (free tier limitation)
- Increase `connectionTimeoutMillis` in `lib/db/index.ts`
- Verify connection pool settings

**Stripe webhook signature verification failed**
- Verify `STRIPE_WEBHOOK_SECRET` matches Stripe Dashboard
- Ensure webhook payload is not being modified by middleware
- Test locally with Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

**Emails not sending**
- Check Resend dashboard for delivery logs
- Verify `RESEND_API_KEY` is correct
- For production: Verify domain is verified in Resend
- Check spam folder

**NextAuth session not persisting**
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Clear browser cookies and try again

## Related Documentation

- **Specification**: `/home/henri/vibe-coding/specs/006-build-l2-english/spec.md`
- **Implementation Plan**: `/home/henri/vibe-coding/specs/006-build-l2-english/plan.md`
- **Research Document**: `/home/henri/vibe-coding/specs/006-build-l2-english/research.md`
- **Data Model**: `/home/henri/vibe-coding/specs/006-build-l2-english/data-model.md`
- **API Contracts**: `/home/henri/vibe-coding/specs/006-build-l2-english/contracts/api-spec.yaml`
- **Webhook Specifications**: `/home/henri/vibe-coding/specs/006-build-l2-english/contracts/webhooks.md`
- **Quickstart Guide**: `/home/henri/vibe-coding/specs/006-build-l2-english/quickstart.md`

## Useful Links

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [NextAuth.js v5 Documentation](https://authjs.dev/)
- [Stripe API Documentation](https://stripe.com/docs/api)
- [Resend Documentation](https://resend.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Zod Documentation](https://zod.dev/)
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)

---

**Last Updated**: 2025-10-09
**Project Status**: Planning Phase Complete (Phase 1)
**Next Phase**: Task Generation (`/speckit.tasks`) → Implementation (`/speckit.implement`)
