import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { courseChapters, exercises, courses } from '@/db/schema'
import { eq, and } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { courseId, chapterId, exerciseId } = body

    if (!courseId || !chapterId || !exerciseId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Get chapter info with exercises list
    const chapter = await db
      .select()
      .from(courseChapters)
      .where(
        and(
          eq(courseChapters.courseId, courseId),
          eq(courseChapters.chapterId, chapterId)
        )
      )
      .limit(1)

    if (chapter.length === 0) {
      return NextResponse.json({ error: 'Chapter not found' }, { status: 404 })
    }

    // Get exercise content
    const exercise = await db
      .select()
      .from(exercises)
      .where(
        and(
          eq(exercises.courseId, courseId),
          eq(exercises.chapterId, chapterId),
          eq(exercises.exerciseId, exerciseId)
        )
      )
      .limit(1)

    if (exercise.length === 0) {
      return NextResponse.json({ error: 'Exercise not found' }, { status: 404 })
    }

    // Get course info for editor type
    const course = await db
      .select()
      .from(courses)
      .where(eq(courses.courseId, courseId))
      .limit(1)

    if (course.length === 0) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    return NextResponse.json({
      chapter: {
        ...chapter[0],
        exercises: chapter[0].exercises || []
      },
      exercise: exercise[0],
      editorType: course[0].editorType || 'static',
    })
  } catch (error) {
    console.error('Error in exercise API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
