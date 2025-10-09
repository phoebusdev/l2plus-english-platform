# L2+ English - Quick Deployment Guide for Client Demo

## ✅ Completed
- ✓ Git repo initialized and committed
- ✓ Pushed to GitHub: https://github.com/phoebusdev/l2plus-english-platform
- ✓ Deployed to Vercel: https://l2plus-english-2xxgdz3ow-phoebusdevs-projects.vercel.app

## 🚀 Next Steps (5 minutes)

### Step 1: Create Vercel Postgres Database

1. Go to https://vercel.com/dashboard
2. Click on your project: **l2plus-english**
3. Go to **Storage** tab
4. Click **Create Database** → **Postgres**
5. Click **Create** (it will auto-connect to your project)

### Step 2: Add Environment Variables

In Vercel dashboard → **Settings** → **Environment Variables**, add:

```bash
# NextAuth
NEXTAUTH_URL=https://YOUR-DEPLOYMENT-URL.vercel.app
NEXTAUTH_SECRET=your-secret-here-generate-with-openssl

# Database (Auto-populated by Vercel Postgres - skip these)
# POSTGRES_URL, POSTGRES_PRISMA_URL, etc. - Already set by Vercel

# Optional for demo (skip for now, add later for full features)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

### Step 3: Generate NEXTAUTH_SECRET

Run this locally:
```bash
openssl rand -base64 32
```

Copy the output and paste it as `NEXTAUTH_SECRET` in Vercel.

### Step 4: Run Database Migrations

After database is created, go to Vercel dashboard → **Deployments** → Click latest deployment → **...** menu → **Redeploy**

OR use CLI:
```bash
vercel env pull .env.local
npm run db:migrate
npm run db:seed
```

### Step 5: Seed Database

The seed script will create:
- Admin user: `admin@l2plusenglish.com` / `Admin123!`
- 4 pricing plans
- 20 placement test questions
- Homepage content

### Step 6: Test the Demo

Visit your deployment URL and test:
- ✓ Homepage loads
- ✓ Registration form works
- ✓ Login with admin credentials
- ✓ View pricing page
- ✓ Take placement test

## 📋 For Client Demo

**What Works Now:**
- Homepage with professional design
- Student registration
- Login system
- Placement test (20 questions, A1-C2 levels)
- Pricing page
- About page

**Coming Soon (after demo):**
- Stripe payment integration
- Email notifications
- Class scheduling
- Admin panel
- Student dashboard

## 🔗 Important Links

- **Live Site**: https://l2plus-english-2xxgdz3ow-phoebusdevs-projects.vercel.app
- **GitHub**: https://github.com/phoebusdev/l2plus-english-platform
- **Vercel Dashboard**: https://vercel.com/phoebusdevs-projects/l2plus-english

## ⚡ Quick Fix If Deployment Fails

The deployment will fail initially because environment variables are missing. After adding NEXTAUTH_SECRET, redeploy:

```bash
vercel --prod
```

Or use the Vercel dashboard **Redeploy** button.
