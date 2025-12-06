import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function POST() {
  try {
    const user = await currentUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const email = user.emailAddresses[0]?.emailAddress
    
    if (!email) {
      return NextResponse.json({ error: 'Email not found' }, { status: 400 })
    }

    // Check if user exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1)

    if (existingUser.length > 0) {
      return NextResponse.json(existingUser[0])
    }

    // Create new user
    const newUser = await db.insert(users).values({
      email,
      name: user.fullName || user.firstName || null,
      points: 0,
      subscription: null,
    }).returning()

    return NextResponse.json(newUser[0])
  } catch (error) {
    console.error('Error in user API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
