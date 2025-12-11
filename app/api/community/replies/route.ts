import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { communityReplies, communityPosts } from '@/db/schema'
import { eq, sql } from 'drizzle-orm'

const dbUrl = process.env.DATABASE_URL!
const db = drizzle(neon(dbUrl))

// POST - Create new reply
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { postId, content } = await request.json()

    if (!postId || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create reply
    const newReply = await db.insert(communityReplies).values({
      postId,
      userId,
      content,
    }).returning()

    // Update reply count on post
    await db
      .update(communityPosts)
      .set({ 
        replies: sql`${communityPosts.replies} + 1`
      })
      .where(eq(communityPosts.id, postId))

    return NextResponse.json(newReply[0])
  } catch (error) {
    console.error('Error creating reply:', error)
    return NextResponse.json({ error: 'Failed to create reply' }, { status: 500 })
  }
}