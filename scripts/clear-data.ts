/**
 * Clear Script for Codebox
 * 
 * This script clears all data from the database.
 * Run with: npx tsx scripts/clear-data.ts
 */

import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { courses, courseChapters, exercises } from '../db/schema'
import { sql as sqlOperator } from 'drizzle-orm'

// Load environment variables
config({ path: '.env.local' })

// Create database connection
const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql, { schema: { courses, courseChapters, exercises } })

async function clear() {
  try {
    console.log('🗑️  Clearing database...')

    // Delete in reverse order due to foreign key constraints
    console.log('  Deleting exercises...')
    await db.delete(exercises)
    
    console.log('  Deleting chapters...')
    await db.delete(courseChapters)
    
    console.log('  Deleting courses...')
    await db.delete(courses)

    console.log('✅ Database cleared successfully!')
    console.log('\nYou can now run: npm run db:seed')
    
  } catch (error) {
    console.error('❌ Error clearing database:', error)
    process.exit(1)
  }
}

clear()
