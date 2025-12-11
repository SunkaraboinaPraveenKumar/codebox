import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { communityPosts, userProfiles, users } from '@/db/schema'
import { desc, eq, sql } from 'drizzle-orm'

const dbUrl = process.env.DATABASE_URL!
const db = drizzle(neon(dbUrl))

// GET - Fetch community posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = db
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
      .orderBy(desc(communityPosts.createdAt))
      .limit(limit)
      .offset(offset)

    if (category && category !== 'all') {
      query = query.where(eq(communityPosts.category, category))
    }

    const posts = await query

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

// POST - Create new community post
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, content, category, tags } = await request.json()

    if (!title || !content || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const newPost = await db.insert(communityPosts).values({
      userId,
      title,
      content,
      category,
      tags: tags?.join(',') || '',
    }).returning()

    return NextResponse.json(newPost[0])
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}