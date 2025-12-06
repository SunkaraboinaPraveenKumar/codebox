import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { db } from '@/db'
import { enrollCourse } from '@/db/schema'

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const email = user.emailAddresses[0]?.emailAddress
    
    if (!email) {
      return NextResponse.json({ error: 'Email not found' }, { status: 400 })
    }

    const body = await request.json()
    const { courseId } = body

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID required' }, { status: 400 })
    }

    const enrollment = await db.insert(enrollCourse).values({
      courseId,
      userId: email,
      xpEarn: 0,
    }).returning()

    return NextResponse.json(enrollment[0])
  } catch (error) {
    console.error('Error in enrollCourse API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
