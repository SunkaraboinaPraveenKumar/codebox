/**
 * Community Seed Script for Codebox
 * 
 * This script seeds the database with sample community data.
 * Run with: npx tsx scripts/seed-community.ts
 */

import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { communityPosts, communityReplies, userProfiles } from '../db/schema'

// Load environment variables
config({ path: '.env.local' })

// Create database connection
const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql, { schema: { communityPosts, communityReplies, userProfiles } })

const samplePosts = [
  {
    userId: 'user_sample1',
    title: 'How to get started with HTML?',
    content: 'I\'m completely new to web development and want to learn HTML. What are the best resources and practices to begin with? Any tips for a beginner?',
    category: 'help',
    tags: 'html,beginner,webdev',
    likes: 5,
    replies: 3
  },
  {
    userId: 'user_sample2', 
    title: 'My first React project - Todo App!',
    content: 'Just finished building my first React application - a todo app with local storage! It was challenging but so rewarding. Here\'s what I learned along the way...',
    category: 'showcase',
    tags: 'react,javascript,project,beginner',
    likes: 12,
    replies: 7
  },
  {
    userId: 'user_sample3',
    title: 'CSS Grid vs Flexbox - When to use what?',
    content: 'I\'ve been learning both CSS Grid and Flexbox, but I\'m still confused about when to use each one. Can someone explain the key differences and use cases?',
    category: 'help',
    tags: 'css,grid,flexbox,layout',
    likes: 8,
    replies: 5
  },
  {
    userId: 'user_sample1',
    title: 'Free JavaScript resources compilation',
    content: 'I\'ve compiled a list of the best free JavaScript learning resources I\'ve found. Includes interactive tutorials, documentation, and practice sites.',
    category: 'resources',
    tags: 'javascript,resources,free,learning',
    likes: 15,
    replies: 2
  },
  {
    userId: 'user_sample4',
    title: 'Junior Frontend Developer position available',
    content: 'We\'re looking for a junior frontend developer to join our team. Remote-friendly, great learning environment. Experience with React preferred but not required.',
    category: 'jobs',
    tags: 'jobs,frontend,junior,remote',
    likes: 3,
    replies: 1
  },
  {
    userId: 'user_sample2',
    title: 'What\'s your favorite code editor and why?',
    content: 'I\'ve been using VS Code but curious about what other developers prefer. What editor do you use and what features make it your favorite?',
    category: 'general',
    tags: 'editor,tools,productivity',
    likes: 9,
    replies: 12
  }
]

const sampleProfiles = [
  {
    userId: 'user_sample1',
    displayName: 'Alex Chen',
    bio: 'Frontend developer learning React and TypeScript',
    location: 'San Francisco, CA',
    githubUrl: 'https://github.com/alexchen'
  },
  {
    userId: 'user_sample2', 
    displayName: 'Sarah Johnson',
    bio: 'Full-stack developer passionate about clean code',
    location: 'New York, NY',
    linkedinUrl: 'https://linkedin.com/in/sarahjohnson'
  },
  {
    userId: 'user_sample3',
    displayName: 'Mike Rodriguez',
    bio: 'CSS enthusiast and design systems advocate',
    location: 'Austin, TX',
    websiteUrl: 'https://mikerodriguez.dev'
  },
  {
    userId: 'user_sample4',
    displayName: 'Emma Wilson',
    bio: 'Tech recruiter helping developers find great opportunities',
    location: 'Remote'
  }
]

const sampleReplies = [
  {
    postId: 1,
    userId: 'user_sample2',
    content: 'Great question! I\'d recommend starting with freeCodeCamp\'s HTML course. It\'s interactive and beginner-friendly.',
    likes: 2
  },
  {
    postId: 1,
    userId: 'user_sample3',
    content: 'Also check out MDN Web Docs for HTML reference. It\'s the most comprehensive resource available.',
    likes: 3
  },
  {
    postId: 2,
    userId: 'user_sample1',
    content: 'Awesome work! Your todo app looks great. Did you implement any advanced features like drag and drop?',
    likes: 1
  },
  {
    postId: 3,
    userId: 'user_sample4',
    content: 'Simple rule: Use Flexbox for 1D layouts (rows or columns), Grid for 2D layouts (rows AND columns).',
    likes: 4
  }
]

async function seedCommunity() {
  try {
    console.log('🌱 Starting community seed...')

    // Insert user profiles
    console.log('👤 Inserting user profiles...')
    for (const profile of sampleProfiles) {
      await db.insert(userProfiles).values(profile)
      console.log(`  ✓ Added profile: ${profile.displayName}`)
    }

    // Insert posts
    console.log('📝 Inserting community posts...')
    for (const post of samplePosts) {
      await db.insert(communityPosts).values(post)
      console.log(`  ✓ Added post: ${post.title}`)
    }

    // Insert replies
    console.log('💬 Inserting replies...')
    for (const reply of sampleReplies) {
      await db.insert(communityReplies).values(reply)
      console.log(`  ✓ Added reply to post ${reply.postId}`)
    }

    console.log('✅ Community seeded successfully!')
    console.log('\nYou can now:')
    console.log('  1. Visit: http://localhost:3000/community')
    console.log('  2. Browse posts and categories')
    console.log('  3. Create your own posts!')
    
  } catch (error) {
    console.error('❌ Error seeding community:', error)
    process.exit(1)
  }
}

seedCommunity()