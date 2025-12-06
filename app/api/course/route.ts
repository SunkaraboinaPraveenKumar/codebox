import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { db } from '@/db'
import { courses, courseChapters, enrollCourse, completedExercise } from '@/db/schema'
import { eq, and, desc } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const courseId = searchParams.get('courseId')
    const enroll = searchParams.get('enroll')

    // Get enrolled courses
    if (courseId === 'enroll') {
      const user = await currentUser()
      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      const email = user.emailAddresses[0]?.emailAddress
      if (!email) {
        return NextResponse.json({ error: 'Email not found' }, { status: 400 })
      }

      const enrolledCourses = await db
        .select({
          course: courses,
          enrollment: enrollCourse,
        })
        .from(enrollCourse)
        .innerJoin(courses, eq(enrollCourse.courseId, courses.courseId))
        .where(eq(enrollCourse.userId, email))

      // Get chapters for each course
      const coursesWithProgress = await Promise.all(
        enrolledCourses.map(async (item) => {
          const chapters = await db
            .select()
            .from(courseChapters)
            .where(eq(courseChapters.courseId, item.course.courseId))

          const totalExercises = chapters.reduce((acc, chapter) => {
            const exercises = chapter.exercises as any[]
            return acc + (exercises?.length || 0)
          }, 0)

          const completed = await db
            .select()
            .from(completedExercise)
            .where(
              and(
                eq(completedExercise.courseId, item.course.courseId),
                eq(completedExercise.userId, email)
              )
            )

          return {
            ...item.course,
            totalExercises,
            completedExercises: completed.length,
            xpEarned: item.enrollment.xpEarn,
          }
        })
      )

      return NextResponse.json(coursesWithProgress)
    }

    // Get specific course details
    if (courseId) {
      const courseIdNum = parseInt(courseId)
      
      const course = await db
        .select()
        .from(courses)
        .where(eq(courses.courseId, courseIdNum))
        .limit(1)

      if (course.length === 0) {
        return NextResponse.json({ error: 'Course not found' }, { status: 404 })
      }

      const chapters = await db
        .select()
        .from(courseChapters)
        .where(eq(courseChapters.courseId, courseIdNum))
        .orderBy(courseChapters.chapterId)

      let userEnroll = false
      let courseEnrollInfo = null
      let completedExercises: any[] = []

      const user = await currentUser()
      if (user) {
        const email = user.emailAddresses[0]?.emailAddress
        if (email) {
          const enrollment = await db
            .select()
            .from(enrollCourse)
            .where(
              and(
                eq(enrollCourse.courseId, courseIdNum),
                eq(enrollCourse.userId, email)
              )
            )
            .limit(1)

          if (enrollment.length > 0) {
            userEnroll = true
            courseEnrollInfo = enrollment[0]

            completedExercises = await db
              .select()
              .from(completedExercise)
              .where(
                and(
                  eq(completedExercise.courseId, courseIdNum),
                  eq(completedExercise.userId, email)
                )
              )
              .orderBy(desc(completedExercise.exerciseId))
          }
        }
      }

      return NextResponse.json({
        course: course[0],
        chapters,
        userEnroll,
        courseEnrollInfo,
        completedExercises,
      })
    }

    // Get all courses
    const allCourses = await db.select().from(courses)
    return NextResponse.json(allCourses)
  } catch (error) {
    console.error('Error in course API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
