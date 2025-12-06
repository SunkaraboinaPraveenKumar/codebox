# Codebox - Quick Start Guide

Get Codebox running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install --legacy-peer-deps
```

## Step 2: Set Up Clerk Authentication

1. Go to [clerk.com](https://clerk.com) and sign up
2. Create a new application
3. Copy your keys from the dashboard
4. Create `.env.local` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
DATABASE_URL=your_neon_db_url
```

## Step 3: Set Up Neon Database

1. Go to [neon.tech](https://neon.tech) and sign up
2. Create a new project
3. Copy the connection string
4. Add it to `.env.local`
5. Push the schema:

```bash
npm run db:push
```

## Step 4: Add Placeholder Images

Create simple placeholder images or download free pixel art from:
- [Kenney.nl](https://kenney.nl/assets?q=2d)
- [OpenGameArt.org](https://opengameart.org)

Required images in `/public`:
- logo.png (40x40)
- hero.gif (any size, animated background)
- machine.webp, alex.gif, books.png, mail.png
- star.png, badge.png, fire.png
- game.png, growth.png, startup.png, tree.png

**Quick tip**: You can use any PNG/GIF images temporarily. Just rename them to match the required names.

## Step 5: Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## What You'll See

- ✅ Landing page with hero section
- ✅ Sign up / Sign in pages
- ✅ Dashboard (after signing in)
- ✅ Courses page
- ✅ Pricing page

## Next Steps

1. **Add Sample Courses**: Insert course data into your database
2. **Customize Styling**: Modify colors and fonts in `app/globals.css`
3. **Add Course Content**: Create chapters and exercises
4. **Set Up Billing**: Configure Clerk Billing for subscriptions
5. **Deploy**: Push to Vercel or your preferred platform

## Common Issues

### "Cannot find module" errors
Run: `npm install --legacy-peer-deps`

### Database connection fails
- Check your DATABASE_URL in `.env.local`
- Ensure it includes `?sslmode=require`
- Run `npm run db:push` to create tables

### Images not loading
- Make sure images exist in `/public` directory
- Check file names match exactly (case-sensitive)
- Use placeholder images temporarily

### Clerk authentication not working
- Verify environment variables are set
- Check Clerk Dashboard settings
- Ensure URLs are configured correctly

## Need Help?

Check `SETUP.md` for detailed documentation.

Happy coding! 🚀
