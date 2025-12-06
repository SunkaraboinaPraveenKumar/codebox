# Codebox - Setup Guide

A complete fullstack SaaS e-learning platform with pixel-style gaming aesthetic.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS v4
- **UI Components**: shadcn/ui with custom pixel-style variants
- **Authentication**: Clerk (Email/Password + Google OAuth)
- **Database**: Neon PostgreSQL with Drizzle ORM
- **Code Editor**: Sandpack (CodeSandbox SDK)
- **Billing**: Clerk Billing (Stripe integration)

## Prerequisites

- Node.js 18+ installed
- A Neon PostgreSQL database account
- A Clerk account for authentication
- Git for version control

## Installation Steps

### 1. Install Dependencies

```bash
npm install --legacy-peer-deps
```

Note: We use `--legacy-peer-deps` due to react-splitter-layout compatibility with React 19.

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Neon Database
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
```

### 3. Set Up Clerk

1. Go to [clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Enable Email/Password authentication
4. Enable Google OAuth (optional)
5. Copy your publishable and secret keys to `.env.local`
6. Add allowed URLs:
   - Development: `http://localhost:3000`
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`

### 4. Set Up Neon Database

1. Go to [neon.tech](https://neon.tech) and create an account
2. Create a new project
3. Copy the connection string to `.env.local`
4. Generate and push database schema:

```bash
npm run db:generate
npm run db:push
```

### 5. Add Required Images

Place the following images in the `/public` directory (see `public/placeholder.txt` for details):

- logo.png
- hero.gif
- machine.webp
- alex.gif
- books.png
- mail.png
- star.png
- badge.png
- fire.png
- game.png
- growth.png
- startup.png
- tree.png

You can find free pixel-style assets at:
- [OpenGameArt.org](https://opengameart.org)
- [Kenney.nl](https://kenney.nl)
- [Itch.io](https://itch.io/game-assets/free)

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 7. Seed Sample Data (Optional)

To add sample courses, you'll need to:

1. Create sample course data
2. Use the admin API endpoints to insert data:
   - POST `/api/admin/saveChapter` - Add course chapters
   - POST `/api/admin/saveExercises` - Add exercises

Example course structure:

```json
{
  "courseId": 1,
  "title": "HTML Beginner",
  "description": "Learn HTML from scratch",
  "bannerImage": "https://example.com/html-banner.gif",
  "level": "beginner",
  "tags": "html,web",
  "editorType": "static"
}
```

## Database Schema

The application uses the following tables:

- **users** - User accounts and points
- **courses** - Course information
- **courseChapters** - Course chapters with exercises
- **exercises** - Exercise content and starter code
- **enrollCourse** - User course enrollments
- **completedExercise** - Completed exercises tracking

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate Drizzle migrations
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Drizzle Studio (database GUI)

## Features Implemented

✅ Landing page with hero section
✅ User authentication (Clerk)
✅ Course browsing and enrollment
✅ Dashboard with progress tracking
✅ User profile with XP and stats
✅ Database schema with Drizzle ORM
✅ API routes for all operations
✅ Responsive design with Tailwind CSS
✅ Dark theme with pixel-style aesthetics
✅ Custom button variants (pixel style)

## Features To Implement

🔲 Course detail page with chapters accordion
🔲 Exercise playground with Sandpack editor
🔲 Exercise completion and XP tracking
🔲 Clerk Billing integration
🔲 Admin panel for content management
🔲 Community features
🔲 Projects section
🔲 Leaderboard
🔲 Certificates
🔲 Daily strike tracking

## Clerk Billing Setup

1. Enable User Billing in Clerk Dashboard
2. Connect Stripe account
3. Create pricing plans:
   - **Free**: Limited access
   - **Unlimited**: $7.99/month with 2-day trial
4. Add `<PricingTable />` component to pricing page
5. Check subscription status with `useOrg()` hook

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

Build command (if needed):
```bash
npm install --legacy-peer-deps && npm run build
```

### Environment Variables for Production

Make sure to add all environment variables from `.env.local` to your deployment platform.

## Troubleshooting

### Peer Dependency Issues

Always use `--legacy-peer-deps` flag when installing packages:
```bash
npm install --legacy-peer-deps <package-name>
```

### Database Connection Issues

- Ensure your DATABASE_URL includes `?sslmode=require`
- Check that your Neon database is active
- Verify connection string is correct

### Clerk Authentication Issues

- Verify environment variables are set correctly
- Check that URLs are configured in Clerk Dashboard
- Ensure middleware is protecting the correct routes

### Image Loading Issues

- Add image domains to `next.config.ts`
- Use Next.js Image component for optimization
- Check that images exist in `/public` directory

## Project Structure

```
codebox/
├── app/
│   ├── api/              # API routes
│   ├── courses/          # Courses pages
│   ├── dashboard/        # Dashboard page
│   ├── pricing/          # Pricing page
│   ├── sign-in/          # Sign in page
│   ├── sign-up/          # Sign up page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Landing page
│   └── provider.tsx      # App providers
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── CourseCard.tsx    # Course card component
│   └── Header.tsx        # Header component
├── context/
│   └── UserDetailContext.tsx  # User context
├── db/
│   ├── index.ts          # Database connection
│   └── schema.ts         # Database schema
├── lib/
│   └── utils.ts          # Utility functions
├── public/               # Static assets
├── .env.local            # Environment variables
├── drizzle.config.ts     # Drizzle configuration
├── middleware.ts         # Clerk middleware
├── next.config.ts        # Next.js configuration
└── package.json          # Dependencies
```

## Support

For issues or questions:
- Check the documentation
- Review the code comments
- Open an issue on GitHub

## License

MIT License - feel free to use this project for learning or commercial purposes.
