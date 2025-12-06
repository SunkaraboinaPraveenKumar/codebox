# Getting Started with Codebox

Welcome to Codebox! This guide will help you get the application running on your local machine.

## What You're Building

Codebox is a fullstack SaaS e-learning platform with:
- 🎮 Pixel-style gaming aesthetic
- 🔐 User authentication
- 💻 Interactive code editor
- 📊 Progress tracking with XP system
- 💳 Subscription billing

## Prerequisites

Before you begin, make sure you have:
- ✅ Node.js 18 or higher installed
- ✅ A code editor (VS Code recommended)
- ✅ Git installed
- ✅ A terminal/command prompt

## Step-by-Step Setup

### 1. Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install --legacy-peer-deps
```

**Why `--legacy-peer-deps`?**
The react-splitter-layout package hasn't been updated for React 19 yet, so we use this flag to bypass the peer dependency check.

**Expected output:** You should see packages being installed. This may take 2-3 minutes.

### 2. Set Up Clerk Authentication

Clerk provides authentication for your app (sign up, sign in, user management).

#### Create a Clerk Account

1. Go to [clerk.com](https://clerk.com)
2. Click "Start building for free"
3. Sign up with your email or GitHub

#### Create an Application

1. Click "Add application"
2. Name it "Codebox" (or any name you prefer)
3. Choose authentication methods:
   - ✅ Email
   - ✅ Google (optional)
4. Click "Create application"

#### Get Your API Keys

1. In the Clerk Dashboard, go to "API Keys"
2. You'll see two keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)
3. Keep this page open - you'll need these keys in the next step

### 3. Set Up Neon Database

Neon provides a serverless PostgreSQL database.

#### Create a Neon Account

1. Go to [neon.tech](https://neon.tech)
2. Click "Sign up"
3. Sign up with your email or GitHub

#### Create a Database

1. Click "Create a project"
2. Name it "codebox-db"
3. Choose a region close to you
4. Click "Create project"

#### Get Your Connection String

1. In your Neon project dashboard, click "Connection string"
2. Copy the connection string (it looks like: `postgresql://user:pass@host/dbname`)
3. Make sure it includes `?sslmode=require` at the end
4. Keep this handy for the next step

### 4. Configure Environment Variables

Create a file named `.env.local` in the root of your project:

```bash
# On Windows
copy .env.example .env.local

# On Mac/Linux
cp .env.example .env.local
```

Open `.env.local` and fill in your keys:

```env
# Clerk Keys (from Step 2)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Neon Database (from Step 3)
DATABASE_URL=postgresql://user:pass@host/dbname?sslmode=require
```

**Important:** Replace the placeholder values with your actual keys!

### 5. Set Up the Database Schema

Now we'll create the database tables:

```bash
npm run db:push
```

**Expected output:**
```
✓ Pushing schema to database...
✓ Done!
```

This creates all the necessary tables (users, courses, exercises, etc.) in your Neon database.

### 6. Add Sample Data (Optional but Recommended)

To see the app in action, let's add some sample courses:

```bash
npm run db:seed
```

**Expected output:**
```
🌱 Starting database seed...
📚 Inserting courses...
  ✓ Added course: HTML Beginner
  ✓ Added course: CSS Fundamentals
  ...
✅ Database seeded successfully!
```

### 7. Add Images

The app needs some images to look good. You have two options:

#### Option A: Use Placeholder Images (Quick)

Create simple placeholder images or download free pixel art:
- [Kenney.nl](https://kenney.nl/assets?q=2d) - Free game assets
- [OpenGameArt.org](https://opengameart.org) - Free pixel art
- [Itch.io](https://itch.io/game-assets/free) - Free game assets

Required images (place in `/public` folder):
- `logo.png` (40x40px) - Your app logo
- `hero.gif` - Animated background
- `machine.webp` - Robot character
- `alex.gif` - Walking character
- `books.png`, `mail.png`, `star.png`, `badge.png`, `fire.png`
- `game.png`, `growth.png`, `startup.png`, `tree.png`

#### Option B: Use Temporary Placeholders

You can use any PNG/GIF images temporarily. Just rename them to match the required names.

### 8. Start the Development Server

```bash
npm run dev
```

**Expected output:**
```
  ▲ Next.js 15.0.7
  - Local:        http://localhost:3000
  - Ready in 2.3s
```

### 9. Open the App

Open your browser and go to: [http://localhost:3000](http://localhost:3000)

You should see the Codebox landing page! 🎉

## What to Try First

### 1. Sign Up
1. Click "Sign Up" in the header
2. Create an account with your email
3. Verify your email (check your inbox)

### 2. Browse Courses
1. Click "Courses" in the navigation
2. You should see the sample courses (if you ran the seed script)

### 3. Enroll in a Course
1. Click on a course card
2. Click "Enroll Now"
3. You're now enrolled!

### 4. View Dashboard
1. Click "Dashboard" in the header
2. See your enrolled courses and progress

## Troubleshooting

### "Cannot find module" errors

**Solution:** Run `npm install --legacy-peer-deps` again

### Database connection fails

**Check:**
- Is your DATABASE_URL correct in `.env.local`?
- Does it end with `?sslmode=require`?
- Is your Neon database active?

**Fix:** Copy the connection string from Neon again and update `.env.local`

### Clerk authentication not working

**Check:**
- Are your Clerk keys correct in `.env.local`?
- Did you copy the full keys (they're quite long)?

**Fix:** Go back to Clerk Dashboard → API Keys and copy them again

### Images not loading

**Check:**
- Do the image files exist in `/public`?
- Are the file names exactly correct (case-sensitive)?

**Fix:** Add placeholder images or use any PNG/GIF files temporarily

### Port 3000 already in use

**Solution:** 
```bash
# Kill the process using port 3000
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:3000 | xargs kill
```

Or use a different port:
```bash
npm run dev -- -p 3001
```

## Next Steps

Now that you have Codebox running:

1. **Explore the Code**
   - Check out `app/page.tsx` for the landing page
   - Look at `app/dashboard/page.tsx` for the dashboard
   - Review `db/schema.ts` for the database structure

2. **Customize the Design**
   - Edit colors in `app/globals.css`
   - Modify components in `components/`
   - Update the pixel-style theme

3. **Add More Courses**
   - Edit `sample-data.json`
   - Run `npm run db:seed` again
   - Or use the admin API endpoints

4. **Implement Missing Features**
   - Check `TODO.md` for a list of features to build
   - Start with the course detail page
   - Then build the exercise playground

5. **Deploy to Production**
   - Follow `DEPLOYMENT.md` for deployment instructions
   - Deploy to Vercel (recommended)
   - Set up Clerk Billing for subscriptions

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:push          # Push schema changes
npm run db:studio        # Open database GUI
npm run db:seed          # Seed sample data

# Code Quality
npm run lint             # Run linter (if configured)
```

## Getting Help

- 📖 Read `SETUP.md` for detailed documentation
- 🚀 Check `QUICKSTART.md` for a condensed guide
- 📋 Review `TODO.md` for feature roadmap
- 🚢 See `DEPLOYMENT.md` for deployment help

## Project Structure

```
codebox/
├── app/                 # Next.js pages and API routes
│   ├── api/            # Backend API endpoints
│   ├── courses/        # Course pages
│   ├── dashboard/      # User dashboard
│   └── page.tsx        # Landing page
├── components/         # React components
│   ├── ui/            # UI components (buttons, cards, etc.)
│   ├── CourseCard.tsx # Course card component
│   └── Header.tsx     # Navigation header
├── context/           # React context for state management
├── db/                # Database configuration
│   ├── schema.ts      # Database tables
│   └── index.ts       # Database connection
├── public/            # Static files (images, etc.)
├── .env.local         # Environment variables (create this)
└── package.json       # Dependencies and scripts
```

## Key Technologies

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Clerk** - Authentication
- **Neon** - PostgreSQL database
- **Drizzle ORM** - Database queries
- **Sandpack** - Code editor (to be implemented)

## What's Included

✅ Landing page with hero section
✅ User authentication (sign up/sign in)
✅ Course browsing
✅ Course enrollment
✅ User dashboard
✅ Progress tracking
✅ XP system
✅ Database schema
✅ API routes
✅ Responsive design
✅ Dark theme

## What's Not Included (Yet)

🔲 Course detail page with chapters
🔲 Exercise playground with code editor
🔲 Exercise completion tracking
🔲 Clerk Billing integration
🔲 Admin panel
🔲 Community features

See `TODO.md` for the complete list.

## Tips for Success

1. **Start Small** - Get the basics working first, then add features
2. **Test Often** - Test each feature as you build it
3. **Read the Docs** - Check the official docs for Next.js, Clerk, etc.
4. **Ask for Help** - Don't hesitate to search for solutions online
5. **Have Fun** - Building is the best way to learn!

## Common Questions

**Q: Do I need to pay for Clerk or Neon?**
A: Both have generous free tiers that are perfect for development and small projects.

**Q: Can I use a different database?**
A: Yes! You can use any PostgreSQL database. Just update the DATABASE_URL.

**Q: Can I use a different auth provider?**
A: Yes, but you'll need to refactor the auth code. Clerk is recommended for simplicity.

**Q: How do I add more courses?**
A: Edit `sample-data.json` and run `npm run db:seed`, or use the API endpoints.

**Q: Can I deploy this for free?**
A: Yes! Vercel offers free hosting for Next.js apps.

---

**Ready to start coding?** Run `npm run dev` and open [http://localhost:3000](http://localhost:3000)!

Happy coding! 🚀
