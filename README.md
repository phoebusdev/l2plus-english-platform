# L2+ English Language Learning Platform

> 🚀 **Demo Ready!** This application works immediately with mock data - no database setup required for initial demo.

A modern, full-stack English language learning platform built with Next.js 15, featuring student registration, CEFR-based placement testing, Stripe payments, and live Zoom class management.

## ✨ Features

### For Students
- **Free Placement Test** - CEFR-aligned assessment (A1-C2)
- **Flexible Pricing Plans** - Monthly subscriptions and one-time packages
- **Live Zoom Classes** - Small group sessions with native speakers
- **Class Materials** - Downloadable PDF resources
- **Progress Tracking** - View test history and achievements

### For Administrators
- **Student Management** - View and manage student profiles
- **Class Scheduling** - Create and manage Zoom class sessions
- **Content Management** - Edit homepage and about page content
- **Test Management** - Update placement test questions
- **Data Export** - CSV/Excel exports for all data types

## 🎯 Tech Stack

- **Framework**: Next.js 15 (App Router, React 19, TypeScript)
- **Auth**: NextAuth.js v5 with JWT sessions and Argon2id hashing
- **Database**: Drizzle ORM + Vercel Postgres
- **Payments**: Stripe Checkout + Webhooks
- **Email**: Resend API with React Email templates
- **UI**: Tailwind CSS 4 + shadcn/ui components
- **Testing**: Vitest (unit) + Playwright (E2E)

## 🚀 Quick Start

### Demo Mode (No Setup Required)

```bash
# Clone and install
git clone <your-repo-url>
cd l2plus-english
npm install

# Run in demo mode with mock data
npm run dev
```

Visit `http://localhost:3000` - the site works immediately with realistic mock data!

### Full Production Setup

1. **Environment Variables**

Copy `.env.example` to `.env` and configure:

```bash
# Required for production
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
POSTGRES_URL=<vercel-postgres-url>
STRIPE_SECRET_KEY=<stripe-secret>
RESEND_API_KEY=<resend-api-key>

# Optional: Disable mock mode
NEXT_PUBLIC_MOCK_MODE=false
```

2. **Database Setup**

```bash
# Push schema to database
npm run db:migrate

# Seed initial data (admin user, pricing plans, test questions)
npm run db:seed
```

3. **Stripe Configuration**

- Create products and prices in Stripe Dashboard
- Update `.env` with webhook secret
- For local testing: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

4. **Deploy**

```bash
# Deploy to Vercel
vercel

# Or build locally
npm run build
npm start
```

## 📋 Default Credentials

After seeding the database:

- **Admin**: `admin@l2plusenglish.com` / `Admin123!`
- **Demo Student**: `john.doe@example.com` / (mock data)

## 🏗️ Project Structure

```
/app
  /(public)          # Public pages (homepage, pricing, about)
  /(auth)            # Auth pages (login, register)
  /(student)         # Student dashboard and features
  /(admin)           # Admin panel
  /api               # API routes with database fallbacks

/lib
  /db                # Database schema and client
  /mock              # Mock data providers for demo
  /auth              # NextAuth configuration
  /validation        # Zod schemas
  /utils             # Utility functions

/components
  /ui                # shadcn/ui components
  /auth              # Auth-related components
  /dashboard         # Dashboard widgets
```

## 🔄 Mock Mode vs Production Mode

### Mock Mode (NEXT_PUBLIC_MOCK_MODE=true)
- ✅ Instant demo without database
- ✅ All features work with realistic data
- ✅ Perfect for development and testing
- ⚠️ Data resets on page refresh

### Production Mode (NEXT_PUBLIC_MOCK_MODE=false)
- ✅ Real database persistence
- ✅ Stripe payment processing
- ✅ Email notifications
- ✅ CRM integration

## 📚 Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:generate      # Generate migrations
npm run db:migrate       # Apply migrations
npm run db:studio        # Open Drizzle Studio
npm run db:seed          # Seed initial data

# Testing
npm run test             # Run unit tests
npm run test:e2e         # Run E2E tests
npm run test:e2e:ui      # E2E tests with UI

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format with Prettier
npm run type-check       # TypeScript checks
```

## 🎨 Key Features Implementation

### Placement Testing
- 20-question multiple choice test
- Auto-scoring with CEFR level assignment
- 7-day retake restriction
- Email results notification

### Payment Processing
- Stripe Checkout integration
- Recurring monthly billing
- One-time payments
- 3-day grace period for failed payments
- Automatic access control

### Class Management
- Admin creates classes with Zoom links
- Level-based enrollment
- Capacity limits
- 24-hour reminder emails
- Material uploads (PDF only, 10MB limit)

## 🔐 Security Features

- Argon2id password hashing
- JWT session tokens
- Role-based access control (student/admin)
- CSRF protection (NextAuth built-in)
- Input validation with Zod
- Stripe webhook signature verification

## 📖 Documentation

- **Specification**: `../specs/006-build-l2-english/spec.md`
- **Implementation Plan**: `../specs/006-build-l2-english/plan.md`
- **Task Breakdown**: `../specs/006-build-l2-english/tasks.md`
- **Data Model**: `../specs/006-build-l2-english/data-model.md`
- **API Contracts**: `../specs/006-build-l2-english/contracts/`

## 🤝 Contributing

This is a spec-driven project. All features are documented in `../specs/006-build-l2-english/`.

To add features:
1. Update specification documents
2. Review with stakeholders
3. Generate tasks with `/speckit.tasks`
4. Implement with `/speckit.implement`

## 📝 License

MIT License - see LICENSE file for details

## 🙋 Support

For issues or questions:
- Check CLAUDE.md for development guidance
- Review documentation in `../specs/`
- Contact: admin@l2plusenglish.com

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies**
