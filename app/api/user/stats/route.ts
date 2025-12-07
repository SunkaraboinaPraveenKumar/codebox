import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { db } from '@/db'
import { users, enrollCourse, completedExercise, courses } from '@/db/schema'
import { eq, count, sql } from 'drizzle-orm'

export async function GET() {
  try {
    const user = await currentUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const email = user.emailAddresses[0]?.emailAddress
    
    if (!email) {
      return NextResponse.json({ error: 'Email not found' }, { status: 400 })
    }

    // Get user basic info
    const userInfo = await db.select().from(users).where(eq(users.email, email)).limit(1)
    
    if (userInfo.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const userData = userInfo[0]

    // Get total XP from user points
    const totalXP = userData.points || 0

    // Get enrolled courses count
    const enrolledCoursesResult = await db
      .select({ count: count() })
      .from(enrollCourse)
      .where(eq(enrollCourse.userId, email))

    const enrolledCoursesCount = enrolledCoursesResult[0]?.count || 0

    // Get completed exercises count
    const completedExercisesResult = await db
      .select({ count: count() })
      .from(completedExercise)
      .where(eq(completedExercise.userId, email))

    const completedExercisesCount = completedExercisesResult[0]?.count || 0

    // Get completed courses (courses where user completed all exercises)
    const completedCoursesQuery = await db
      .select({
        courseId: enrollCourse.courseId,
        completedCount: sql<number>`count(${completedExercise.courseId})`.as('completed_count')
      })
      .from(enrollCourse)
      .leftJoin(completedExercise, 
        sql`${enrollCourse.courseId} = ${completedExercise.courseId} AND ${enrollCourse.userId} = ${completedExercise.userId}`
      )
      .where(eq(enrollCourse.userId, email))
      .groupBy(enrollCourse.courseId)

    // Calculate badges based on achievements
    let badges = 0
    
    // Badge for first course enrollment
    if (enrolledCoursesCount > 0) badges++
    
    // Badge for first exercise completion
    if (completedExercisesCount > 0) badges++
    
    // Badge for 100 XP
    if (totalXP >= 100) badges++
    
    // Badge for 500 XP
    if (totalXP >= 500) badges++
    
    // Badge for 1000 XP
    if (totalXP >= 1000) badges++
    
    // Badge for completing 10 exercises
    if (completedExercisesCount >= 10) badges++
    
    // Badge for completing 50 exercises
    if (completedExercisesCount >= 50) badges++
    
    // Badge for enrolling in 3+ courses
    if (enrolledCoursesCount >= 3) badges++

    // Calculate day streak (simplified - based on recent activity)
    // For now, we'll calculate based on recent exercise completions
    // In a real app, you'd want to track daily login/activity
    const recentActivity = await db
      .select()
      .from(completedExercise)
      .where(eq(completedExercise.userId, email))
      .orderBy(sql`${completedExercise.id} DESC`)
      .limit(7) // Last 7 activities

    // Simple streak calculation - if user has activity in recent days
    let dayStreak = 0
    if (recentActivity.length > 0) {
      // For demo purposes, calculate streak based on activity frequency
      const now = new Date()
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

      if (recentActivity.length >= 5) dayStreak = 7 // Very active
      else if (recentActivity.length >= 3) dayStreak = 3 // Moderately active
      else if (recentActivity.length >= 1) dayStreak = 1 // Some activity
    }

    // Get learning progress
    const learningProgress = {
      coursesEnrolled: enrolledCoursesCount,
      exercisesCompleted: completedExercisesCount,
      coursesCompleted: completedCoursesQuery.filter(c => c.completedCount > 0).length
    }

    return NextResponse.json({
      totalXP,
      badges,
      dayStreak,
      learningProgress,
      achievements: {
        firstCourse: enrolledCoursesCount > 0,
        firstExercise: completedExercisesCount > 0,
        xp100: totalXP >= 100,
        xp500: totalXP >= 500,
        xp1000: totalXP >= 1000,
        exercises10: completedExercisesCount >= 10,
        exercises50: completedExercisesCount >= 50,
        courses3: enrolledCoursesCount >= 3
      }
    })
  } catch (error) {
    console.error('Error in user stats API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}