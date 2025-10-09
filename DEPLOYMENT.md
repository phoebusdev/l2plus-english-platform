# L2+ English - Deployment Guide

## 🎯 Deployment Modes

### Mode 1: Demo/Prototype (Immediate - No Setup)

**Perfect for**: Initial client demos, testing UI/UX, stakeholder presentations

✅ **Works immediately**
✅ **No database required**
✅ **No payment setup required**
✅ **No email service required**

```bash
# Already configured in .env
NEXT_PUBLIC_MOCK_MODE=true
```

**Deploy to Vercel**:
```bash
vercel
```

That's it! The site is live and fully functional with mock data.

**Demo Credentials** (mock auth):
- Student: `john.doe@example.com`
- Admin: `admin@l2plusenglish.com`
- (No passwords needed in demo mode)

---

### Mode 2: Production (Full Implementation)

**Perfect for**: Real users, actual business operations, production environment

#### Step 1: Database Setup (Vercel Postgres)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Storage** → **Create Database** → **Postgres**
3. Copy connection strings to `.env`:

```bash
POSTGRES_URL=<your-connection-string>
POSTGRES_PRISMA_URL=<your-prisma-url>
POSTGRES_URL_NON_POOLING=<your-non-pooling-url>
```

4. Push schema and seed data:

```bash
npm run db:migrate
npm run db:seed
```

#### Step 2: Authentication Setup

Generate secure auth secret:

```bash
openssl rand -base64 32
```

Add to `.env`:

```bash
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=<generated-secret>
```

#### Step 3: Stripe Configuration

1. Create account at [Stripe Dashboard](https://dashboard.stripe.com)
2. Create 4 products matching pricing plans:
   - Starter Plan: £49/month
   - Standard Plan: £89/month
   - Intensive Plan: £129/month
   - Private 1:1: £199 one-time

3. Get API keys:

```bash
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
```

4. Configure webhook:
   - URL: `https://yourdomain.com/api/webhooks/stripe`
   - Events: `invoice.paid`, `invoice.payment_failed`, `customer.subscription.deleted`
   - Copy webhook secret: `STRIPE_WEBHOOK_SECRET=whsec_...`

#### Step 4: Email Service (Resend)

1. Create account at [Resend](https://resend.com)
2. Verify your domain
3. Get API key:

```bash
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

#### Step 5: Switch to Production Mode

Update `.env`:

```bash
NEXT_PUBLIC_MOCK_MODE=false
```

#### Step 6: Deploy

```bash
# Deploy to production
vercel --prod

# Or push to main branch (auto-deploys if connected)
git push origin main
```

---

## 🔄 Switching Between Modes

### Demo → Production

1. Set `NEXT_PUBLIC_MOCK_MODE=false` in Vercel env vars
2. Add all production credentials
3. Redeploy

### Production → Demo (Rollback)

1. Set `NEXT_PUBLIC_MOCK_MODE=true` in Vercel env vars
2. Redeploy

---

## 📊 Environment Variables Reference

### Required for Demo Mode
```bash
NEXT_PUBLIC_MOCK_MODE=true
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### Required for Production Mode
```bash
# Auth
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=<secret>

# Database
POSTGRES_URL=<url>

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Optional
KONDESK_EMAIL=admin@yourdomain.com
DEFAULT_CLASS_CAPACITY=10
```

---

## 🚀 Vercel Deployment Steps

### First-Time Deployment

1. **Connect Repository**:
   ```bash
   vercel login
   vercel
   ```

2. **Configure Project**:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Add Environment Variables** (in Vercel Dashboard):
   - Go to Project Settings → Environment Variables
   - Add all required variables
   - Select environments (Production/Preview/Development)

4. **Deploy**:
   ```bash
   vercel --prod
   ```

### Continuous Deployment

Once connected, every push to `main` auto-deploys to production.

```bash
git push origin main
# Vercel automatically builds and deploys
```

---

## 🔍 Post-Deployment Verification

### Demo Mode Checklist
- [ ] Homepage loads and displays content
- [ ] Pricing page shows 4 plans
- [ ] Login page accessible
- [ ] Register page accessible
- [ ] Student dashboard shows mock data
- [ ] About page displays content

### Production Mode Checklist
- [ ] Homepage loads from database
- [ ] User registration works (creates DB record)
- [ ] Login authentication works
- [ ] Placement test saves results
- [ ] Stripe checkout redirects correctly
- [ ] Webhook endpoint receives Stripe events
- [ ] Emails are sent (check Resend dashboard)
- [ ] Admin panel accessible with admin account
- [ ] Database connection stable (no errors in logs)

---

## 🐛 Troubleshooting

### Build Fails on Vercel

**Issue**: Build command error
**Solution**: Check `package.json` scripts and ensure all dependencies are listed

```bash
# Locally test build
npm run build
```

### Mock Mode Stuck After Production Setup

**Issue**: Site still showing mock data after adding real credentials
**Solution**: Set `NEXT_PUBLIC_MOCK_MODE=false` in Vercel environment variables and redeploy

### Database Connection Issues

**Issue**: "Cannot connect to database"
**Solution**:
1. Verify `POSTGRES_URL` in Vercel env vars
2. Check database is not paused (free tier auto-pauses)
3. Ensure connection pooling is configured

### Stripe Webhooks Not Working

**Issue**: Payments complete but database not updating
**Solution**:
1. Verify webhook endpoint URL is correct
2. Check webhook secret matches `.env`
3. Review webhook logs in Stripe Dashboard
4. Ensure webhook events are configured correctly

### Email Not Sending

**Issue**: No emails received
**Solution**:
1. Check Resend dashboard for delivery logs
2. Verify domain is verified in Resend
3. Check spam/junk folder
4. Ensure `RESEND_FROM_EMAIL` uses verified domain

---

## 📈 Scaling Considerations

### Performance Optimization
- Enable Vercel Edge Caching for static pages
- Use Vercel Image Optimization for instructor photos
- Configure Vercel Analytics for monitoring

### Database Scaling
- Monitor connection pool usage
- Consider upgrading Vercel Postgres tier for more connections
- Implement Redis caching for frequently accessed data

### Cost Management
- Vercel: Monitor bandwidth and function invocations
- Database: Track storage and query costs
- Stripe: Watch for test mode charges (should be $0)
- Resend: Monitor email quota (10k/month free tier)

---

## 🔐 Security Checklist

- [ ] NEXTAUTH_SECRET is strong and unique
- [ ] Stripe webhook signature verification enabled
- [ ] Database credentials stored in env vars (not committed)
- [ ] API routes validate authentication
- [ ] Admin routes check role permissions
- [ ] Input validation with Zod on all forms
- [ ] HTTPS enforced (Vercel handles this)
- [ ] CORS configured correctly
- [ ] Rate limiting considered for API routes

---

## 📝 Maintenance

### Regular Tasks
- Monitor Vercel deployment logs
- Review Stripe dashboard for payment issues
- Check Resend delivery rates
- Backup database regularly
- Update dependencies monthly
- Review security advisories

### Emergency Rollback
```bash
# Revert to previous deployment
vercel rollback
```

---

## 🎉 Success Metrics

After production deployment:
- ✅ Homepage loads < 2 seconds
- ✅ Registration completes successfully
- ✅ Placement test saves results
- ✅ Stripe payments process correctly
- ✅ Emails deliver within 2 minutes
- ✅ Admin can create classes
- ✅ Students can enroll in classes
- ✅ Zero console errors in browser

---

**Need Help?**
- Check CLAUDE.md for development guidance
- Review logs in Vercel Dashboard
- Contact: admin@l2plusenglish.com
