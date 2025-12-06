# Codebox - TODO List

## Priority 1: Core Features (Required for MVP)

### Course Detail Page
- [ ] Create `/app/courses/[courseId]/page.tsx`
- [ ] Implement chapters accordion with shadcn/ui Accordion
- [ ] Show chapter number badges
- [ ] Display exercises list per chapter
- [ ] Add "Pro" badges for locked chapters (index >= 2)
- [ ] Implement enrollment button
- [ ] Show course progress sidebar
- [ ] Add completed exercise indicators

### Exercise Playground
- [ ] Create `/app/courses/[courseId]/[chapterId]/[exerciseSlug]/page.tsx`
- [ ] Integrate Sandpack code editor
- [ ] Implement React Splitter Layout (40:60 ratio)
- [ ] Display exercise content (theory, task, hint)
- [ ] Add "Run Code" button
- [ ] Add "Mark Completed" button
- [ ] Implement XP earning on completion
- [ ] Add navigation (Previous/Next buttons)
- [ ] Show XP display in footer
- [ ] Update header to hide menu in playground mode

### Accordion Component
- [ ] Create `components/ui/accordion.tsx`
- [ ] Use @radix-ui/react-accordion
- [ ] Style with pixel-style theme

### Tooltip Component
- [ ] Create `components/ui/tooltip.tsx`
- [ ] Use @radix-ui/react-tooltip
- [ ] Add tooltips for locked exercises

## Priority 2: Admin Features

### Admin API Routes
- [ ] Create `/app/api/admin/saveChapter/route.ts`
- [ ] Create `/app/api/admin/saveExercises/route.ts`
- [ ] Add authentication check for admin routes
- [ ] Create sample data seeding script

### Admin Panel (Optional)
- [ ] Create `/app/admin` directory
- [ ] Build course creation form
- [ ] Build chapter creation form
- [ ] Build exercise creation form
- [ ] Add rich text editor for content

## Priority 3: Billing Integration

### Clerk Billing Setup
- [ ] Enable User Billing in Clerk Dashboard
- [ ] Connect Stripe account
- [ ] Create pricing plans in Clerk
- [ ] Add `<PricingTable />` to pricing page
- [ ] Implement subscription check with `useOrg()` hook
- [ ] Add access control for pro features
- [ ] Test payment flow with Stripe test cards

## Priority 4: Enhanced Features

### User Experience
- [ ] Add loading skeletons for all async components
- [ ] Implement error boundaries
- [ ] Add 404 and error pages
- [ ] Improve mobile responsiveness
- [ ] Add animations and transitions
- [ ] Implement toast notifications for all actions

### Progress Tracking
- [ ] Daily strike tracking system
- [ ] Badge system implementation
- [ ] Achievement notifications
- [ ] Progress analytics dashboard

### Community Features
- [ ] Create `/app/community` page
- [ ] Discussion forums per exercise
- [ ] User comments and replies
- [ ] Upvote/downvote system
- [ ] Community leaderboard

### Projects Section
- [ ] Create `/app/projects` page
- [ ] Project templates
- [ ] Project submission system
- [ ] Project showcase gallery

## Priority 5: Polish & Optimization

### Performance
- [ ] Implement lazy loading for course lists
- [ ] Optimize images (use WebP format)
- [ ] Add Suspense boundaries
- [ ] Optimize bundle size
- [ ] Implement caching strategies
- [ ] Add service worker for PWA

### SEO & Metadata
- [ ] Add proper meta tags for all pages
- [ ] Implement Open Graph tags
- [ ] Add structured data (JSON-LD)
- [ ] Create sitemap.xml
- [ ] Add robots.txt

### Testing
- [ ] Write unit tests for components
- [ ] Write integration tests for API routes
- [ ] Test authentication flows
- [ ] Test payment flows
- [ ] Cross-browser testing
- [ ] Mobile device testing

## Priority 6: Advanced Features

### Gamification
- [ ] Leaderboard system
- [ ] Achievement badges
- [ ] Streak rewards
- [ ] XP multipliers
- [ ] Level system
- [ ] Profile customization

### Content
- [ ] Video tutorial integration
- [ ] Interactive code challenges
- [ ] Code review system
- [ ] Mentor matching
- [ ] Certificate generation
- [ ] Course completion certificates

### Social Features
- [ ] Friend system
- [ ] Social sharing
- [ ] Team/group learning
- [ ] Study groups
- [ ] Live coding sessions
- [ ] Code collaboration

### Internationalization
- [ ] Add i18n support
- [ ] Translate UI to multiple languages
- [ ] RTL language support
- [ ] Currency localization for pricing

## Priority 7: DevOps & Monitoring

### Deployment
- [ ] Set up CI/CD pipeline
- [ ] Configure staging environment
- [ ] Set up production environment
- [ ] Configure custom domain
- [ ] Set up SSL certificates

### Monitoring
- [ ] Add error tracking (Sentry)
- [ ] Add analytics (Google Analytics / Plausible)
- [ ] Add performance monitoring
- [ ] Set up logging system
- [ ] Create admin dashboard for metrics

### Security
- [ ] Implement rate limiting
- [ ] Add CSRF protection
- [ ] Security audit
- [ ] Penetration testing
- [ ] Data encryption at rest
- [ ] Regular security updates

## Quick Wins (Easy Improvements)

- [ ] Add favicon
- [ ] Add loading states to all buttons
- [ ] Improve error messages
- [ ] Add keyboard shortcuts
- [ ] Add dark/light theme toggle
- [ ] Add search functionality for courses
- [ ] Add course filtering by level/tags
- [ ] Add course sorting options
- [ ] Add user profile page
- [ ] Add settings page

## Known Issues

- [ ] react-splitter-layout peer dependency warning (using --legacy-peer-deps)
- [ ] Need to add actual image assets (currently using placeholders)
- [ ] Clerk Billing needs to be configured in dashboard
- [ ] Sample course data needs to be seeded

## Notes

- Use `npm install --legacy-peer-deps` for all package installations
- Always test authentication flows after Clerk changes
- Run `npm run db:push` after schema changes
- Check diagnostics with `getDiagnostics` tool before committing
- Follow pixel-style design guidelines for all new components
- Maintain dark theme consistency across all pages

---

Last Updated: December 4, 2024
