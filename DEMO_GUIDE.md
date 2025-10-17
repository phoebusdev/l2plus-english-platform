# L2+ English Platform - Demo Guide

**Live Demo URL**: https://l2plus-english.vercel.app

## ✅ What's Working for Demo

### 1. **Student Registration & Login**
- ✅ Students can register with email/password
- ✅ Form validation (password strength, timezone selection)
- ✅ Secure password hashing (Argon2id)
- ✅ Login/logout functionality
- ✅ Session management (JWT-based)

**Demo credentials**:
- **Admin**: admin@l2plusenglish.com / Admin123!
- **Test Student**: Register a new account to test student flow

### 2. **Placement Test System**
- ✅ 20-question test across 5 pages (4 questions per page)
- ✅ Multiple choice questions with 4 options each
- ✅ Progress tracking through test
- ✅ Automatic CEFR level assignment based on score:
  - 0-33%: A1 (Beginner)
  - 34-50%: A2 (Elementary)
  - 51-66%: B1 (Intermediate)
  - 67-83%: B2 (Upper Intermediate)
  - 84-91%: C1 (Advanced)
  - 92-100%: C2 (Proficient)
- ✅ 7-day retake restriction
- ✅ Test results history

### 3. **Student Dashboard**
- ✅ View assigned CEFR level
- ✅ See payment status
- ✅ View upcoming classes (filtered by level)
- ✅ Access test results
- ✅ Responsive mobile design

### 4. **Admin Panel** (Full CRUD Operations)
- ✅ **Dashboard**: Overview of students, classes, payments
- ✅ **Student Management**:
  - View all students with filters (level, payment status)
  - Manually adjust CEFR levels
  - View student details and test history
  - Export data (CSV/Excel)
- ✅ **Class Management**:
  - Create/edit/delete Zoom classes
  - Set capacity, schedule, CEFR level requirements
  - Upload class materials (PDFs via Vercel Blob)
  - View enrollment counts
- ✅ **Test Management**:
  - Update placement test questions (must have exactly 20)
  - Preview test before publishing
  - Version tracking
- ✅ **Content Management**:
  - Edit homepage hero section
  - Edit About Us page content
  - Update pricing plan descriptions
- ✅ **Export System**:
  - Export students, payments, test results, classes, enrollments
  - CSV and Excel formats

### 5. **Pricing Page**
- ✅ Display 4 pricing tiers from database
- ✅ Stripe Checkout integration configured
- ✅ Responsive design

### 6. **Class Browsing**
- ✅ Students can view classes matching their CEFR level
- ✅ See class details (instructor, schedule, capacity)
- ✅ Enrollment status display

## ⚠️ Requires Client Configuration

These features are **implemented** but need the client's API keys to work:

### 1. **Payment Processing**
**Status**: Stripe API keys connected, webhook created but secret not added

**What's configured**:
- ✅ Stripe SDK integrated
- ✅ Checkout sessions create properly
- ✅ Webhook endpoint created: `https://l2plus-english.vercel.app/api/webhooks/stripe`
- ❌ `STRIPE_WEBHOOK_SECRET` not added (needed for payment confirmation)

**What works without secret**:
- Checkout flow initiates
- Redirects to Stripe payment page
- Student can enter payment info

**What requires secret**:
- Payment confirmation after successful charge
- Updating student payment status to "active"
- Subscription renewal handling
- Payment failure notifications

**To enable**: Client needs to:
1. Go to Stripe Dashboard → Webhooks
2. Find webhook ID: `we_1SJ05eCa9NqyGh3sKa3p8ICr`
3. Reveal signing secret
4. Add to Vercel: `STRIPE_WEBHOOK_SECRET=whsec_...`

### 2. **Email Notifications**
**Status**: Code implemented, requires Resend API key

**Email templates ready**:
- Registration confirmation
- Placement test results
- Payment success/failure
- Subscription cancelled
- Class reminders (24 hours before)
- Password reset

**To enable**: Client needs to:
1. Sign up at https://resend.com
2. Verify their domain
3. Get API key
4. Add to Vercel: `RESEND_API_KEY=re_...` and `RESEND_FROM_EMAIL=noreply@clientdomain.com`

### 3. **Kondesk CRM Integration** (Optional)
**Status**: Integration code ready, webhook URL needed

**To enable**: Client provides:
- `KONDESK_WEBHOOK_URL` - Their Kondesk webhook endpoint
- `KONDESK_EMAIL` - Admin email for CRM

## 🏗️ Infrastructure

### Database (Neon via Vercel Marketplace)
- ✅ PostgreSQL 16 database
- ✅ 12 tables created and seeded:
  - users, students, placement_tests, test_results
  - pricing_plans, payments, class_sessions
  - enrollments, class_materials
  - homepage_content, about_us_content, email_log
- ✅ Connection pooling configured
- ✅ Automatic backups (Neon feature)

### File Storage (Vercel Blob)
- ✅ PDF upload support (10MB max)
- ✅ Class materials storage
- ✅ Signed URLs for authenticated downloads
- ✅ Global CDN distribution

### Authentication (NextAuth.js v5)
- ✅ JWT sessions (Edge-compatible)
- ✅ Argon2id password hashing
- ✅ Role-based access control (student/admin)
- ✅ Secure session management

### Deployment (Vercel)
- ✅ Serverless functions
- ✅ Edge Network CDN
- ✅ Automatic HTTPS
- ✅ Environment variable management
- ✅ Daily cron job for class reminders

## 📊 Seeded Demo Data

### Admin Account
- **Email**: admin@l2plusenglish.com
- **Password**: Admin123!
- **Role**: admin

### Demo Student Account
- **Email**: student@demo.com
- **Password**: Student123!
- **CEFR Level**: B2 (Upper Intermediate)
- **Payment Status**: Active (Standard Plan)
- **Enrolled Classes**: 3 upcoming classes
- **Test Results**: 15/20 (75%, B2 level)

### Pricing Plans (4 tiers)
1. **Basic** - $29/month - 4 classes/month
2. **Standard** - $49/month - 8 classes/month
3. **Premium** - $79/month - 12 classes/month
4. **Intensive** - $129/month - 20 classes/month

### Placement Test
- **Version**: 1
- **Questions**: 20 (seeded with sample questions)
- **Format**: Multiple choice, 4 options each
- **Coverage**: Grammar, vocabulary, reading comprehension

### Content
- Homepage hero section (editable via admin)
- About Us page (editable via admin)

## 🎯 Demo Flow Recommendations

### For Client Demo Session:

1. **Show Public Pages**
   - Homepage → About → Pricing → FAQ → Contact
   - Highlight professional design, mobile responsiveness
   - Show legal pages (Terms, Cookies, Privacy)

2. **Demo Student Login** (Fastest Way to Show Features)
   - Login with: student@demo.com / Student123!
   - View Dashboard with B2 level assignment
   - Browse Classes (3 enrolled, 1 available)
   - View Materials (enrolled classes with downloadable PDFs)
   - View Test Results (75% score, B2 assignment)
   - Check Billing page (Active subscription)

3. **Student Registration Flow** (If Time Permits)
   - Register new student
   - Show form validation
   - Login immediately after registration

4. **Placement Test**
   - Take the 20-question test (5 pages)
   - Show progress tracking
   - Complete test and see CEFR level assignment
   - Show 7-day retake restriction

5. **Admin Panel Tour**
   - Login as admin (admin@l2plusenglish.com / Admin123!)
   - Show student list with filters (includes demo student)
   - Show existing classes with enrollments
   - Create a new test class
   - Upload a sample PDF material
   - Edit homepage content live
   - Export student data (CSV/Excel)
   - Manage pricing plans

6. **Explain Client Setup Requirements**
   - Stripe webhook secret (5 minutes to add)
   - Resend API key for emails (10 minutes to set up domain)
   - Ready to go live once configured

## 🔒 Security Features

- ✅ Argon2id password hashing (2025 OWASP standard)
- ✅ CSRF protection (NextAuth.js)
- ✅ SQL injection prevention (Drizzle ORM parameterized queries)
- ✅ Stripe webhook signature verification
- ✅ File upload validation (PDF only, 10MB max)
- ✅ Role-based API route protection
- ✅ Secure session management (JWT)
- ✅ HTTPS-only (Vercel automatic)

## 📱 Browser Compatibility

- ✅ Chrome/Edge (Chromium) - Latest
- ✅ Firefox - Latest
- ✅ Safari 14+
- ✅ Mobile Safari (iOS 13+)
- ✅ Chrome Mobile (Android)

## 🚀 Production Readiness

### Already Done ✅
- Database migrations
- Environment variables (partial)
- Stripe integration configured
- Vercel Blob storage
- Security hardening
- Error handling
- Type safety (TypeScript strict mode)
- Build optimization (Next.js Turbopack)

### Client Must Add ❌
- `STRIPE_WEBHOOK_SECRET` (5 minutes)
- `RESEND_API_KEY` + `RESEND_FROM_EMAIL` (10 minutes with domain)
- Switch Stripe from test to live keys when ready for real payments
- (Optional) `KONDESK_WEBHOOK_URL` for CRM integration

### Estimated Time to Full Production: 15-20 minutes
(Once client has Stripe dashboard access and Resend account)

---

**Built with**: Next.js 15, React 19, TypeScript 5, Tailwind CSS 4, Drizzle ORM, NextAuth.js v5, Stripe SDK, Vercel

**Last Updated**: 2025-10-16
