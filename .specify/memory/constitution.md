# L2+ English Platform Constitution

<!--
Sync Impact Report - v1.1.0
============================================
Version Change: 1.0.0 → 1.1.0 (MINOR: Added Design System Standards)
Modified Principles: None (existing principles unchanged)
Added Sections: VII. Design System Standards
Removed Sections: None
Templates Requiring Updates:
  ✅ spec-template.md - No changes required (design system is implementation detail)
  ✅ plan-template.md - No changes required (design system referenced in UI sections)
  ✅ tasks-template.md - No changes required (design tasks follow standard format)
  ✅ checklist-template.md - No changes required (design checks are quality gates)
Documentation Updated:
  ✅ DESIGN_SYSTEM.md - Created comprehensive design system reference
  ✅ CLAUDE.md - Added Design System Standards section with quick reference
Follow-up TODOs:
  - Enforce design system standards in code reviews
  - Add design system lint rules if feasible (future enhancement)
-->

## Core Principles

### I. Dual-Mode Architecture (Demo + Production)

**MUST** maintain separation between demo/mock mode and production mode with single-codebase approach.

- Every feature MUST work in both mock mode (NEXT_PUBLIC_MOCK_MODE=true) and production mode (false)
- Mock data MUST be realistic and comprehensive, mirroring production data structures
- API routes MUST gracefully fallback to mock data when database is unavailable
- NO database, payment services, or external dependencies required for demo mode
- Production mode switch MUST be single environment variable toggle

**Rationale**: Client needs immediate prototype demonstrations before committing to service payments. This architecture enables instant demos while maintaining production-ready code, eliminating duplicate codebases and accelerating client approval cycles.

### II. Type Safety Throughout

**MUST** enforce strict TypeScript compilation and runtime validation at all boundaries.

- TypeScript strict mode MUST be enabled (`strict: true`)
- All API routes MUST have corresponding Zod validation schemas
- All database queries MUST use Drizzle ORM typed queries (no `any` types)
- All components MUST have explicit prop types
- Environment variables MUST be validated with Zod at startup

**Rationale**: Type safety prevents runtime errors in production, catches bugs during development, and serves as living documentation. Educational platform handling student data and payments cannot afford type-related bugs.

### III. Security First (NON-NEGOTIABLE)

**MUST** follow modern security best practices for authentication, data handling, and payment processing.

Required security measures:
- Argon2id password hashing (memory-hard, OWASP recommended)
- JWT sessions with automatic CSRF protection (NextAuth.js)
- Role-based access control (student/admin) enforced at middleware and route level
- Stripe webhook signature verification for all payment events
- Input validation with Zod on all user inputs
- File upload restrictions (PDF only, 10MB max, MIME type verification)
- SQL injection prevention via parameterized queries (Drizzle ORM)
- Sensitive data (passwords, API keys) NEVER logged or exposed in errors

**Rationale**: Platform handles student personal data, payment information, and authentication credentials. Security breaches would destroy trust, violate GDPR, and expose financial liability. Educational institutions require demonstrated security compliance.

### IV. Specification-Driven Development

**MUST** follow spec-kit methodology with constitution → specification → plan → tasks → implementation workflow.

- NO code written before specification is approved
- Specification documents MUST be reviewed and updated before feature work
- Implementation MUST match specification acceptance criteria exactly
- Constitution amendments MUST be documented and versioned
- Breaking changes to principles require MAJOR version bump

**Rationale**: Client requirements are complex with multiple stakeholders (students, admins, payment processing). Spec-first approach prevents scope creep, ensures stakeholder alignment, and provides audit trail for regulatory compliance.

### V. Test Coverage for Critical Paths

**MUST** maintain automated testing for core revenue and security functions.

Required test coverage:
- Student registration and login flow (E2E)
- Placement test scoring and CEFR assignment (unit)
- Payment processing and webhook handling (integration)
- Admin authentication and authorization (integration)
- CEFR level assignment algorithm (unit)
- Grace period calculation for failed payments (unit)

**Rationale**: Broken registration blocks revenue, incorrect CEFR assignment damages brand reputation, payment bugs cause financial losses. Automated tests catch regressions before production deployment.

### VI. Performance Standards

**MUST** meet performance targets for user-facing operations.

Performance requirements:
- All pages MUST load in < 2 seconds (measured on 10 Mbps connection)
- API routes MUST respond in < 500ms (p95 latency)
- Placement test results MUST display within 5 seconds of submission
- Stripe webhooks MUST process within 10 seconds
- Class material downloads MUST start within 30 seconds
- Mobile responsive down to 320px width minimum

**Rationale**: Educational platform competes with established providers. Slow performance causes student abandonment, damages brand perception, and reduces conversion rates. Performance directly impacts revenue.

### VII. Design System Standards

**MUST** maintain strict visual consistency through systematic design tokens and component patterns.

Design system requirements:
- All spacing MUST use 4px-based increments (4/6/8/12/16px only)
- Section padding MUST be `py-16 md:py-24` (regular) or `py-20 md:py-32` (hero)
- Card padding MUST be uniform `p-6` across all cards
- Form field spacing MUST be `space-y-6`, field groups `space-y-2`
- Grid gaps MUST be consistent `gap-6`
- Typography MUST limit to 2-3 responsive breakpoints maximum
- Headings MUST use `font-poppins` (600-800 weight)
- Body text MUST use `font-inter` (400-600 weight)
- Dark theme MUST be default and consistent (`bg-gray-900`, `bg-gray-800` for cards)
- Colors MUST use semantic variables only (`primary`, `secondary`, `accent`)
- NEVER use hardcoded Tailwind colors (`bg-red-500`, `text-blue-400`)
- NEVER use 4+ typography breakpoints (`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl`)
- NEVER use random spacing (`mb-3`, `mb-5`, `mb-7`, `mb-9`, `mb-10`, `mb-14`)
- NEVER use scale transforms on grid items (breaks alignment)
- All color combinations MUST meet WCAG AA contrast standards (4.5:1 for text, 3:1 for UI)

**Rationale**: Visual consistency directly impacts brand perception and user trust. Educational platforms targeting professional learners must appear polished and well-designed. Random spacing, inconsistent typography, and contrast issues signal unprofessionalism and reduce conversion rates. Systematic design tokens prevent visual regression and accelerate development by eliminating design decisions. See `DESIGN_SYSTEM.md` for comprehensive reference.

## Technology Standards

### Approved Stack

**Framework & Runtime:**
- Next.js 15 with App Router (NOT Pages Router)
- React 19 with Server Components as default
- TypeScript 5.3+
- Node.js 20 LTS

**Database & ORM:**
- Vercel Postgres (PostgreSQL 16+)
- Drizzle ORM (NOT Prisma - smaller bundle, faster serverless)
- Drizzle Kit for migrations

**Authentication:**
- NextAuth.js v5 (Auth.js) with JWT sessions (NOT database sessions)
- Argon2id password hashing (NOT bcrypt - more secure)

**Payments:**
- Stripe SDK with Checkout (NOT Payment Intents API - simpler, PCI compliant)
- Webhook-based payment status updates

**Email:**
- Resend API for transactional emails
- React Email for templates

**UI & Styling:**
- Tailwind CSS 4 (utility-first)
- shadcn/ui component library
- Minimalist design (per client requirement - no heavy animations)

**Testing:**
- Vitest for unit tests
- Playwright for E2E tests
- Testing Library for component tests

**Deployment:**
- Vercel for hosting (serverless functions, Edge runtime)
- Vercel Blob for file storage

### Forbidden Practices

**MUST NOT:**
- Use Pages Router (deprecated pattern)
- Store passwords in plaintext or use bcrypt (use Argon2id)
- Store JWT sessions in database (use cookie-based JWT)
- Use ANY types in TypeScript
- Skip input validation on API routes
- Store files on local filesystem (use Vercel Blob)
- Expose sensitive data in error messages
- Commit API keys or secrets to repository
- Deploy without running type-check and lint
- Make database schema changes without migration

## Development Workflow

### Feature Development Process

1. **Specification Phase**
   - Update `spec.md` with user stories and acceptance criteria
   - Run `/speckit.clarify` to resolve ambiguities
   - Get stakeholder approval on specification

2. **Planning Phase**
   - Run `/speckit.plan` to generate technical design
   - Review architecture decisions and data model
   - Identify dependencies and risks

3. **Task Generation**
   - Run `/speckit.tasks` to create implementation checklist
   - Break down into subtasks with dependencies
   - Assign priorities

4. **Implementation Phase**
   - Run `/speckit.implement` to execute tasks
   - Follow TDD for critical paths (auth, payments, scoring)
   - Create mock data alongside production code
   - Write tests for edge cases

5. **Review & Deploy**
   - Run type-check, lint, and test suite
   - Manual QA of critical flows
   - Deploy to preview environment
   - Get client approval
   - Deploy to production

### Code Review Requirements

**MUST include in pull request:**
- Specification reference (which user story/acceptance criteria)
- Test coverage for new code
- Mock data updates (if applicable)
- Migration script (if database schema changed)
- Environment variable documentation (if new vars added)
- CLAUDE.md updates (if new patterns introduced)

**Reviewers MUST verify:**
- Code matches specification exactly
- Type safety maintained (no `any` types)
- Security best practices followed
- Mock mode still works
- Tests pass
- No secrets committed

## Governance

### Amendment Process

**Constitution supersedes all other practices.** Changes require:

1. **Proposal**: Document proposed change with rationale
2. **Version Bump Decision**:
   - MAJOR: Backward incompatible changes (removing principles, changing stack)
   - MINOR: New principles added or expanded guidance
   - PATCH: Clarifications, wording improvements, typo fixes
3. **Template Sync**: Update affected template files
4. **Documentation**: Update CLAUDE.md and README if principles referenced
5. **Approval**: Get stakeholder sign-off for MAJOR/MINOR changes
6. **Migration Plan**: Document how existing code must adapt (if breaking change)

### Compliance Review

**All development MUST verify compliance:**
- Pre-commit: Type-check and lint pass
- Pre-PR: Test suite passes
- Code review: Security and type safety checked
- Pre-deploy: Mock mode and production mode both tested

**Violations:**
- Security violations block deployment immediately
- Type safety violations require fix before merge
- Spec mismatches require specification update or code fix
- Performance regressions require optimization or justification

### Guidance Files

- **Runtime Development**: See `CLAUDE.md` for detailed technical guidance
- **Deployment**: See `DEPLOYMENT.md` for production deployment steps
- **Specification**: See `../specs/006-build-l2-english/spec.md` for requirements
- **Data Model**: See `../specs/006-build-l2-english/data-model.md` for schema

**Version**: 1.1.0 | **Ratified**: 2025-10-09 | **Last Amended**: 2025-10-09
