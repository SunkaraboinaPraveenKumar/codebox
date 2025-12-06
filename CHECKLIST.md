# Codebox Setup Checklist

Use this checklist to ensure you've completed all setup steps.

## ☐ Prerequisites

- [ ] Node.js 18+ installed
- [ ] Code editor installed (VS Code recommended)
- [ ] Git installed
- [ ] Terminal/command prompt access

## ☐ Installation

- [ ] Cloned/downloaded the project
- [ ] Opened terminal in project directory
- [ ] Ran `npm install --legacy-peer-deps`
- [ ] Installation completed without errors

## ☐ Clerk Setup

- [ ] Created account at clerk.com
- [ ] Created new application
- [ ] Enabled Email authentication
- [ ] Enabled Google OAuth (optional)
- [ ] Copied publishable key (pk_test_...)
- [ ] Copied secret key (sk_test_...)

## ☐ Neon Database Setup

- [ ] Created account at neon.tech
- [ ] Created new project
- [ ] Copied connection string
- [ ] Connection string includes `?sslmode=require`

## ☐ Environment Variables

- [ ] Created `.env.local` file
- [ ] Added NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
- [ ] Added CLERK_SECRET_KEY
- [ ] Added DATABASE_URL
- [ ] Verified all keys are correct (no typos)

## ☐ Database Schema

- [ ] Ran `npm run db:push`
- [ ] Command completed successfully
- [ ] No error messages

## ☐ Sample Data (Optional)

- [ ] Ran `npm run db:seed`
- [ ] Sample courses added
- [ ] Sample chapters added
- [ ] Sample exercises added

## ☐ Images

- [ ] Added logo.png to /public
- [ ] Added hero.gif to /public
- [ ] Added other required images (or using placeholders)
- [ ] Images display correctly

## ☐ First Run

- [ ] Ran `npm run dev`
- [ ] Server started without errors
- [ ] Opened http://localhost:3000
- [ ] Landing page loads correctly

## ☐ Authentication Test

- [ ] Clicked "Sign Up"
- [ ] Created account successfully
- [ ] Received verification email
- [ ] Verified email
- [ ] Signed in successfully

## ☐ Feature Test

- [ ] Viewed courses page
- [ ] Courses display correctly
- [ ] Clicked on a course
- [ ] Enrolled in a course
- [ ] Viewed dashboard
- [ ] Dashboard shows enrolled course

## ☐ Build Test

- [ ] Ran `npm run build`
- [ ] Build completed successfully
- [ ] No TypeScript errors
- [ ] No build errors

## ☐ Next Steps

- [ ] Read PROJECT-SUMMARY.md
- [ ] Review TODO.md for features to build
- [ ] Customize design/colors
- [ ] Add more courses
- [ ] Build course detail page
- [ ] Build exercise playground

## ☐ Deployment (When Ready)

- [ ] Pushed code to GitHub
- [ ] Created Vercel account
- [ ] Imported project to Vercel
- [ ] Added environment variables to Vercel
- [ ] Deployed successfully
- [ ] Updated Clerk URLs for production
- [ ] Tested production site

## ☐ Clerk Billing (When Ready)

- [ ] Enabled User Billing in Clerk
- [ ] Connected Stripe account
- [ ] Created pricing plans
- [ ] Added PricingTable component
- [ ] Tested subscription flow

---

## Troubleshooting

If you checked a box but it didn't work:

### Installation Issues
- Try: `npm install --legacy-peer-deps` again
- Clear node_modules and reinstall
- Check Node.js version (should be 18+)

### Database Issues
- Verify DATABASE_URL is correct
- Check Neon database is active
- Try running `npm run db:push` again

### Authentication Issues
- Double-check Clerk keys in `.env.local`
- Verify keys are complete (they're long!)
- Check Clerk Dashboard settings

### Build Issues
- Run `npm run build` to see specific errors
- Check for TypeScript errors
- Verify all imports are correct

### Image Issues
- Check file names match exactly
- Verify files are in `/public` directory
- Use placeholders temporarily

---

## Quick Commands Reference

```bash
# Install
npm install --legacy-peer-deps

# Database
npm run db:push          # Create tables
npm run db:seed          # Add sample data
npm run db:studio        # View database

# Development
npm run dev              # Start dev server
npm run build            # Test build
npm run start            # Start production

# Help
cat GETTING-STARTED.md   # Detailed guide
cat QUICKSTART.md        # Quick guide
cat TODO.md              # Feature list
```

---

## Progress Tracker

**Setup Progress**: ___/10 sections complete

**Status**: 
- [ ] Not Started
- [ ] In Progress
- [ ] Completed
- [ ] Deployed

**Notes**:
_Add any notes or issues here_

---

**Last Updated**: ___________
**Completed By**: ___________

---

🎉 **Congratulations!** Once all boxes are checked, you're ready to start building!
