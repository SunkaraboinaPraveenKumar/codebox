# Codebox - Deployment Guide

## Pre-Deployment Checklist

### 1. Code Quality
- [ ] Run `npm run build` locally - ensure no errors
- [ ] Fix all TypeScript errors
- [ ] Test all user flows manually
- [ ] Check mobile responsiveness
- [ ] Test in different browsers (Chrome, Firefox, Safari)
- [ ] Review console for warnings/errors

### 2. Environment Setup
- [ ] All environment variables documented
- [ ] `.env.example` file is up to date
- [ ] No sensitive data in code
- [ ] API keys are secure

### 3. Database
- [ ] Database schema is finalized
- [ ] Run `npm run db:push` to sync schema
- [ ] Backup database (if migrating)
- [ ] Test database connections
- [ ] Verify all queries work

### 4. Authentication
- [ ] Clerk is configured correctly
- [ ] Test sign up flow
- [ ] Test sign in flow
- [ ] Test Google OAuth (if enabled)
- [ ] Verify protected routes work
- [ ] Test sign out functionality

### 5. Assets
- [ ] All required images are in `/public`
- [ ] Images are optimized (WebP format)
- [ ] Favicon is added
- [ ] Logo is high quality
- [ ] No broken image links

## Vercel Deployment

### Step 1: Prepare Repository

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Codebox SaaS platform"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/codebox.git
git branch -M main
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: (leave default)
   - **Install Command**: `npm install --legacy-peer-deps`

### Step 3: Add Environment Variables

In Vercel project settings, add:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxx
CLERK_SECRET_KEY=sk_live_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
DATABASE_URL=postgresql://user:pass@host/dbname?sslmode=require
```

**Important**: Use production keys, not test keys!

### Step 4: Configure Build Settings

If you encounter peer dependency issues, update build command:

```bash
npm install --legacy-peer-deps && npm run build
```

### Step 5: Deploy

Click "Deploy" and wait for build to complete.

## Post-Deployment

### 1. Update Clerk Settings

In Clerk Dashboard:
- Add production domain to allowed URLs
- Update redirect URLs
- Test authentication on production

### 2. Update Database

If using Neon:
- Ensure production database is active
- Run migrations if needed
- Verify connection from Vercel

### 3. Test Production

- [ ] Visit production URL
- [ ] Test sign up/sign in
- [ ] Test course browsing
- [ ] Test enrollment
- [ ] Test dashboard
- [ ] Test all navigation links
- [ ] Check mobile view
- [ ] Test payment flow (if Clerk Billing is set up)

### 4. Configure Custom Domain (Optional)

1. In Vercel project settings, go to "Domains"
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate to provision
5. Update Clerk allowed URLs with custom domain

### 5. Set Up Monitoring

- [ ] Add error tracking (Sentry)
- [ ] Add analytics (Google Analytics / Plausible)
- [ ] Set up uptime monitoring
- [ ] Configure alerts for errors

## Alternative Deployment Options

### Railway

1. Create account at [railway.app](https://railway.app)
2. Create new project from GitHub
3. Add environment variables
4. Deploy

### Netlify

1. Create account at [netlify.com](https://netlify.com)
2. Import from GitHub
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add environment variables
5. Deploy

### Self-Hosted (VPS)

```bash
# On your server
git clone https://github.com/yourusername/codebox.git
cd codebox
npm install --legacy-peer-deps
npm run build

# Set up environment variables
nano .env.local

# Start with PM2
npm install -g pm2
pm2 start npm --name "codebox" -- start
pm2 save
pm2 startup
```

## Clerk Billing Setup (Production)

### 1. Enable Billing

1. Go to Clerk Dashboard
2. Navigate to "Billing" section
3. Enable User Billing
4. Connect Stripe account (production mode)

### 2. Create Plans

**Free Plan:**
- Name: Free
- Price: $0
- Features: Limited courses, Limited exercises

**Unlimited Plan:**
- Name: Unlimited
- Price: $7.99/month
- Trial: 2 days
- Features: All courses, All exercises, Priority support

### 3. Update Code

Ensure pricing page uses:
```tsx
import { PricingTable } from '@clerk/nextjs'

<PricingTable />
```

### 4. Test Payment Flow

1. Use Stripe test cards in development
2. Switch to live mode in production
3. Test subscription flow
4. Verify webhook events
5. Test subscription cancellation

## Database Migration

If migrating from development to production:

```bash
# Generate migration
npm run db:generate

# Review migration files in /drizzle

# Push to production database
DATABASE_URL=your_production_url npm run db:push
```

## Performance Optimization

### Before Launch

- [ ] Enable Next.js Image Optimization
- [ ] Implement lazy loading
- [ ] Add loading skeletons
- [ ] Optimize bundle size
- [ ] Enable compression
- [ ] Add caching headers

### After Launch

- [ ] Monitor Core Web Vitals
- [ ] Optimize slow queries
- [ ] Add CDN for static assets
- [ ] Implement Redis caching (if needed)

## Security Checklist

- [ ] All API routes validate authentication
- [ ] Environment variables are secure
- [ ] HTTPS is enabled
- [ ] CORS is configured correctly
- [ ] Rate limiting is implemented
- [ ] SQL injection protection (Drizzle handles this)
- [ ] XSS protection (React handles this)
- [ ] CSRF protection (Next.js handles this)

## Rollback Plan

If deployment fails:

1. **Vercel**: Click "Rollback" to previous deployment
2. **Database**: Restore from backup
3. **Clerk**: Revert configuration changes
4. **DNS**: Update records if needed

## Monitoring & Maintenance

### Daily
- Check error logs
- Monitor uptime
- Review user feedback

### Weekly
- Review analytics
- Check performance metrics
- Update dependencies (security patches)

### Monthly
- Full security audit
- Performance optimization
- Feature updates
- Database optimization

## Support & Documentation

- [ ] Create user documentation
- [ ] Set up support email
- [ ] Create FAQ page
- [ ] Set up community Discord/Slack
- [ ] Create video tutorials

## Launch Checklist

- [ ] All features tested
- [ ] Production environment configured
- [ ] Custom domain set up (if applicable)
- [ ] SSL certificate active
- [ ] Analytics configured
- [ ] Error tracking active
- [ ] Backup system in place
- [ ] Support channels ready
- [ ] Marketing materials prepared
- [ ] Social media accounts created

## Post-Launch

- [ ] Announce launch
- [ ] Monitor for issues
- [ ] Gather user feedback
- [ ] Plan next features
- [ ] Regular updates

---

**Need Help?**

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Clerk Docs: https://clerk.com/docs
- Neon Docs: https://neon.tech/docs

Good luck with your launch! 🚀
