/**
 * Seed Script for Codebox
 * 
 * This script seeds the database with sample course data.
 * Run with: npx tsx scripts/seed-data.ts
 * 
 * Make sure to install tsx first: npm install -D tsx
 */

import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { courses, courseChapters, exercises } from '../db/schema'
import sampleData from '../sample-data.json'

// Load environment variables
config({ path: '.env.local' })

// Create database connection
const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql, { schema: { courses, courseChapters, exercises } })

async function seed() {
  try {
    console.log('🌱 Starting database seed...')

    // Insert courses
    console.log('📚 Inserting courses...')
    for (const course of sampleData.courses) {
      await db.insert(courses).values(course)
      console.log(`  ✓ Added course: ${course.title}`)
    }

    // Insert chapters
    console.log('📖 Inserting chapters...')
    for (const chapter of sampleData.chapters) {
      await db.insert(courseChapters).values(chapter)
      console.log(`  ✓ Added chapter: ${chapter.name}`)
    }

    // Insert exercises
    console.log('✏️  Inserting exercises...')
    for (const exercise of sampleData.exercises) {
      await db.insert(exercises).values(exercise)
      console.log(`  ✓ Added exercise: ${exercise.exerciseName}`)
    }

    console.log('✅ Database seeded successfully!')
    console.log('\nYou can now:')
    console.log('  1. Run: npm run dev')
    console.log('  2. Visit: http://localhost:3000')
    console.log('  3. Browse courses and start learning!')
    
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seed()
