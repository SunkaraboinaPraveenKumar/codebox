# Codebox 🎮

A complete fullstack SaaS e-learning platform where users learn programming through interactive exercises with a gamified, pixel-style gaming aesthetic.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38bdf8)

## ✨ Features

- 🎨 **Pixel-Style Gaming Aesthetic** - Retro gaming look with Jersey 10 font
- 🔐 **Authentication** - Clerk with Email/Password + Google OAuth
- 💾 **Database** - Neon PostgreSQL with Drizzle ORM
- 💻 **Code Editor** - Sandpack for in-browser coding
- 📊 **Progress Tracking** - XP system, badges, and daily strikes
- 💳 **Billing** - Clerk Billing integration (Stripe)
- 📱 **Responsive Design** - Mobile-first with Tailwind CSS
- 🌙 **Dark Theme** - Beautiful dark mode by default

## 🚀 Quick Start

**New to the project?** → Read [START-HERE.md](START-HERE.md) first!

**Want to get started fast?** → See [QUICKSTART.md](QUICKSTART.md) for a 5-minute setup guide.

```bash
# Install dependencies
npm install --legacy-peer-deps

# Set up environment variables
cp .env.example .env.local
# Add your Clerk and Neon credentials

# Push database schema
npm run db:push

# Run development server
npm run dev
```

## 📚 Documentation

- [QUICKSTART.md](QUICKSTART.md) - Get started in 5 minutes
- [SETUP.md](SETUP.md) - Detailed setup and configuration guide

## 🛠️ Tech Stack

### Frontend
- Next.js 15 (App Router)
- React 19 with TypeScript
- Tailwind CSS v4
- shadcn/ui components
- Jersey 10 font (Google Fonts)

### Backend
- Next.js API Routes
- Neon PostgreSQL (serverless)
- Drizzle ORM

### Authentication & Billing
- Clerk Authentication
- Clerk Billing (Stripe)

### Code Editor
- Sandpack (CodeSandbox SDK)
- React Splitter Layout

## 📁 Project Structure

```
codebox/
├── app/                  # Next.js app directory
│   ├── api/             # API routes
│   ├── courses/         # Course pages
│   ├── dashboard/       # User dashboard
│   ├── pricing/         # Pricing page
│   └── sign-in/         # Auth pages
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── CourseCard.tsx  # Course card
│   └── Header.tsx      # Navigation header
├── context/            # React context
├── db/                 # Database schema & config
├── lib/                # Utility functions
└── public/             # Static assets
```

## 🎯 Current Status

### ✅ Implemented
- Landing page with hero section
- User authentication (Clerk)
- Course browsing and enrollment
- Dashboard with progress tracking
- User profile with XP system
- Database schema with Drizzle ORM
- API routes for all operations
- Responsive design
- Dark theme with pixel aesthetics

### 🔲 To Implement
- Course detail page with chapters
- Exercise playground with Sandpack
- Exercise completion tracking
- Clerk Billing integration
- Admin panel
- Community features
- Leaderboard
- Certificates

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run db:generate  # Generate Drizzle migrations
npm run db:push      # Push schema to database
npm run db:studio    # Open Drizzle Studio
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

Build command (if needed):
```bash
npm install --legacy-peer-deps && npm run build
```

## 📝 Environment Variables

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
DATABASE_URL=postgresql://...
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org)
- [Clerk](https://clerk.com)
- [Neon](https://neon.tech)
- [shadcn/ui](https://ui.shadcn.com)
- [Sandpack](https://sandpack.codesandbox.io)

---

Built with ❤️ for developers learning to code
