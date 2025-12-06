import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { db } from '@/db'
import { completedExercise, enrollCourse, users } from '@/db/schema'
import { eq, and, sql } from 'drizzle-orm'

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
    const { courseId, chapterId, exerciseId, xpEarn } = body

    if (!courseId || !chapterId || exerciseId === undefined || !xpEarn) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if already completed
    const existing = await db
      .select()
      .from(completedExercise)
      .where(
        and(
          eq(completedExercise.courseId, courseId),
          eq(completedExercise.chapterId, chapterId),
          eq(completedExercise.exerciseId, exerciseId),
          eq(completedExercise.userId, email)
        )
      )
      .limit(1)

    if (existing.length > 0) {
      return NextResponse.json({ message: 'Already completed' })
    }

    // Insert completed exercise
    await db.insert(completedExercise).values({
      courseId,
      chapterId,
      exerciseId,
      userId: email,
    })

    // Update enrollment XP
    await db
      .update(enrollCourse)
      .set({
        xpEarn: sql`${enrollCourse.xpEarn} + ${xpEarn}`,
      })
      .where(
        and(
          eq(enrollCourse.courseId, courseId),
          eq(enrollCourse.userId, email)
        )
      )

    // Update user points
    await db
      .update(users)
      .set({
        points: sql`${users.points} + ${xpEarn}`,
      })
      .where(eq(users.email, email))

    return NextResponse.json({ success: true, message: 'Exercise completed!' })
  } catch (error) {
    console.error('Error in complete exercise API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
