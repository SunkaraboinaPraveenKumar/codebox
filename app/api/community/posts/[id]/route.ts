import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { communityPosts, communityReplies, userProfiles } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

const dbUrl = process.env.DATABASE_URL!
const db = drizzle(neon(dbUrl))

// GET - Fetch single post with replies
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = parseInt(params.id)

    // Get post details
    const post = await db
      .select({
        id: communityPosts.id,
        title: communityPosts.title,
        content: communityPosts.content,
        category: communityPosts.category,
        tags: communityPosts.tags,
        likes: communityPosts.likes,
        replies: communityPosts.replies,
        createdAt: communityPosts.createdAt,
        userId: communityPosts.userId,
        userDisplayName: userProfiles.displayName,
        userAvatar: userProfiles.avatar,
      })
      .from(communityPosts)
      .leftJoin(userProfiles, eq(communityPosts.userId, userProfiles.userId))
      .where(eq(communityPosts.id, postId))
      .limit(1)

    if (post.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // Get replies
    const replies = await db
      .select({
        id: communityReplies.id,
        content: communityReplies.content,
        likes: communityReplies.likes,
        createdAt: communityReplies.createdAt,
        userId: communityReplies.userId,
        userDisplayName: userProfiles.displayName,
        userAvatar: userProfiles.avatar,
      })
      .from(communityReplies)
      .leftJoin(userProfiles, eq(communityReplies.userId, userProfiles.userId))
      .where(eq(communityReplies.postId, postId))
      .orderBy(desc(communityReplies.createdAt))

    return NextResponse.json({
      post: post[0],
      replies
    })
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 })
  }
}