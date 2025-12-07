"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { EmptyState } from '@/components/EmptyState'
import { BookOpen, Lock, CheckCircle, Star, Trophy } from 'lucide-react'
import { toast } from 'sonner'

interface Exercise {
  name: string
  slug: string
  xp: number
  difficulty: string
}

interface Chapter {
  id: number
  courseId: number
  chapterId: number
  name: string
  description: string
  exercises: Exercise[]
}

interface Course {
  id: number
  courseId: number
  title: string
  description: string
  bannerImage: string
  level: string
  editorType: string
}

interface CourseData {
  course: Course
  chapters: Chapter[]
  userEnroll: boolean
  courseEnrollInfo: any
  completedExercises: any[]
}

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { isSignedIn } = useUser()
  const [courseData, setCourseData] = useState<CourseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)

  useEffect(() => {
    if (params.courseId) {
      fetchCourseData()
    }
  }, [params.courseId])

  const fetchCourseData = async () => {
    try {
      const response = await axios.get(`/api/course?courseId=${params.courseId}`)
      setCourseData(response.data)
    } catch (error) {
      console.error('Error fetching course:', error)
      toast.error('Failed to load course')
    } finally {
      setLoading(false)
    }
  }

  const handleEnroll = async () => {
    if (!isSignedIn) {
      router.push('/sign-in')
      return
    }

    setEnrolling(true)
    try {
      await axios.post('/api/enrollCourse', {
        courseId: courseData?.course.courseId
      })
      toast.success('Successfully enrolled!')
      fetchCourseData()
    } catch (error) {
      console.error('Error enrolling:', error)
      toast.error('Failed to enroll')
    } finally {
      setEnrolling(false)
    }
  }

  const isExerciseCompleted = (chapterId: number, exerciseSlug: string) => {
    return courseData?.completedExercises.some(
      (ex) => ex.chapterId === chapterId && ex.exerciseId === exerciseSlug
    )
  }

  const getTotalExercises = () => {
    return courseData?.chapters.reduce((acc, chapter) => acc + (chapter.exercises?.length || 0), 0) || 0
  }

  const getTotalXP = () => {
    return courseData?.chapters.reduce((acc, chapter) => {
      return acc + (chapter.exercises?.reduce((sum, ex) => sum + ex.xp, 0) || 0)
    }, 0) || 0
  }

  const getCompletedCount = () => {
    return courseData?.completedExercises.length || 0
  }

  const getProgressPercentage = () => {
    const total = getTotalExercises()
    const completed = getCompletedCount()
    return total > 0 ? (completed / total) * 100 : 0
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="mb-6">
              <img 
                src="/loading.gif" 
                alt="Loading..." 
                className="w-32 h-32 mx-auto"
              />
            </div>
            <p className="text-2xl font-game text-white mb-2">Loading course...</p>
            <p className="text-gray-400">Please wait</p>
          </div>
        </div>
      </div>
    )
  }

  if (!courseData) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center py-20">
            <div className="text-8xl mb-6">❌</div>
            <h3 className="text-4xl font-game text-white mb-4">Course Not Found</h3>
            <p className="text-xl text-gray-400 mb-8 max-w-md mx-auto">
              The course you're looking for doesn't exist or has been removed.
            </p>
            <a href="/courses">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg px-8 py-3 rounded-lg border-4 border-yellow-600 hover:border-yellow-700 transition-all duration-200 hover:scale-105 shadow-lg font-game cursor-pointer">
                Browse All Courses
              </button>
            </a>
          </div>
        </div>
      </div>
    )
  }

  const { course, chapters, userEnroll, courseEnrollInfo } = courseData

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      {/* Course Banner */}
      <section className="relative h-[400px] overflow-hidden">
        <Image
          src={course.bannerImage}
          alt={course.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/50" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <h1 className="text-5xl md:text-6xl font-game mb-4 text-white" style={{
              textShadow: '3px 3px 0px rgba(0,0,0,0.8)'
            }}>
              {course.title}
            </h1>
            <p className="text-xl md:text-2xl text-white mb-6 max-w-3xl" style={{
              textShadow: '2px 2px 0px rgba(0,0,0,0.8)'
            }}>
              {course.description}
            </p>
            {!userEnroll ? (
              <button 
                onClick={handleEnroll}
                disabled={enrolling}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xl px-8 py-4 rounded-lg border-4 border-yellow-600 hover:border-yellow-700 transition-all duration-200 hover:scale-105 shadow-lg font-game cursor-pointer"
              >
                {enrolling ? 'Enrolling...' : '🚀 Enroll Now'}
              </button>
            ) : (
              <button className="bg-green-500 hover:bg-green-600 text-white font-bolder text-xl px-8 py-4 rounded-lg border-4 border-green-600 hover:border-green-700 transition-all duration-200 shadow-lg font-game cursor-pointer">
                ✅ Enrolled - Continue Learning
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="bg-slate-800 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Chapters */}
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-game mb-8 text-white" style={{
                textShadow: '2px 2px 0px rgba(0,0,0,0.8)'
              }}>
                📚 Course Content
              </h2>

              {chapters.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-8xl mb-6">📝</div>
                  <h3 className="text-3xl font-game text-white mb-4">No Content Yet</h3>
                  <p className="text-xl text-gray-400">This course is being prepared. Check back soon!</p>
                </div>
              ) : (
                <Accordion type="single" collapsible className="space-y-6">
                  {chapters.map((chapter, chapterIndex) => {
                    const isLocked = chapterIndex >= 2 && !userEnroll
                    
                    return (
                      <AccordionItem 
                        key={chapter.id} 
                        value={`chapter-${chapter.id}`}
                        className="bg-slate-700 border-2 border-slate-600 rounded-xl overflow-hidden hover:border-yellow-400 transition-all"
                      >
                        <AccordionTrigger className="px-6 py-4 hover:bg-slate-600 transition-colors [&>svg]:text-yellow-400 hover:no-underline">
                          <div className="flex items-center gap-4 w-full">
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-400 text-black font-bold text-xl shrink-0">
                              {chapter.chapterId}
                            </div>
                            <div className="flex-1 text-left">
                              <h3 className="text-2xl font-game text-white">{chapter.name}</h3>
                              {chapter.description && (
                                <p className="text-sm text-gray-300 mt-1">{chapter.description}</p>
                              )}
                            </div>
                            {isLocked && (
                              <div className="flex items-center gap-2 bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full text-sm font-bold">
                                <Lock className="h-4 w-4" />
                                PRO
                              </div>
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 pt-2">
                          {!chapter.exercises || chapter.exercises.length === 0 ? (
                            <p className="text-gray-400 text-center py-6">No exercises yet</p>
                          ) : (
                            <div className="space-y-4 mt-4">
                              {chapter.exercises.map((exercise, exerciseIndex) => {
                                const isCompleted = isExerciseCompleted(chapter.chapterId, exercise.slug)
                                const exerciseNumber = chapters
                                  .slice(0, chapterIndex)
                                  .reduce((acc, ch) => acc + (ch.exercises?.length || 0), 0) + exerciseIndex + 1

                                return (
                                  <div
                                    key={exercise.slug}
                                    className="flex items-center justify-between p-4 bg-slate-600 rounded-lg hover:bg-slate-500 transition-all cursor-pointer border-2 border-transparent hover:border-yellow-400"
                                    onClick={() => {
                                      if (userEnroll && !isLocked) {
                                        router.push(`/courses/${course.courseId}/${chapter.chapterId}/${exercise.slug}`)
                                      } else if (!userEnroll) {
                                        toast.error('Please enroll first!')
                                      } else {
                                        toast.error('Upgrade to Pro to unlock!')
                                      }
                                    }}
                                  >
                                    <div className="flex items-center gap-4 flex-1">
                                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-yellow-400 text-black font-bold text-sm">
                                        {exerciseNumber}
                                      </div>
                                      <div className="flex-1">
                                        <h4 className="text-lg font-game text-white">{exercise.name}</h4>
                                        <p className="text-sm text-gray-300 capitalize">{exercise.difficulty}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <div className="flex items-center gap-1 bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full text-sm font-bold">
                                        <Star className="h-4 w-4" />
                                        {exercise.xp} XP
                                      </div>
                                      {isCompleted ? (
                                        <div className="flex items-center gap-1 bg-green-500/20 text-green-500 px-3 py-1 rounded-full text-sm font-bold">
                                          <CheckCircle className="h-4 w-4" />
                                          Done
                                        </div>
                                      ) : isLocked || !userEnroll ? (
                                        <div className="flex items-center gap-1 bg-slate-700 text-gray-400 px-3 py-1 rounded-full text-sm">
                                          <Lock className="h-4 w-4" />
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          )}
                        </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            )}
          </div>

            {/* Right: Course Stats */}
            <div className="space-y-6">
              {/* Progress Card */}
              {userEnroll && (
                <div className="bg-slate-700 border-2 border-slate-600 rounded-2xl p-6">
                  <h3 className="text-3xl font-game mb-4 flex items-center gap-2 text-white">
                    <Trophy className="h-8 w-8 text-yellow-400" />
                    Your Progress
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-300">Exercises</span>
                        <span className="text-white font-bold">
                          {getCompletedCount()} / {getTotalExercises()}
                        </span>
                      </div>
                      <Progress value={getProgressPercentage()} className="h-3" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-yellow-500/10 rounded-lg border-2 border-yellow-500/30">
                      <span className="text-gray-300">XP Earned</span>
                      <span className="text-2xl font-bold text-yellow-500 flex items-center gap-2">
                        <Star className="h-6 w-6" />
                        {courseEnrollInfo?.xpEarn || 0}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Course Info */}
              <div className="bg-slate-700 border-2 border-slate-600 rounded-2xl p-6">
                <h3 className="text-3xl font-game mb-4 flex items-center gap-2 text-white">
                  <BookOpen className="h-8 w-8 text-yellow-400" />
                  Course Info
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Level</span>
                    <span className="text-white font-bold capitalize">{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Chapters</span>
                    <span className="text-white font-bold">{chapters.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Exercises</span>
                    <span className="text-white font-bold">{getTotalExercises()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Total XP</span>
                    <span className="text-yellow-500 font-bold flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      {getTotalXP()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Upgrade Card */}
              {!userEnroll && (
                <div className="bg-slate-700 border-2 border-yellow-400 rounded-2xl p-6 text-center">
                  <div className="text-6xl mb-4">🚀</div>
                  <h3 className="text-3xl font-game mb-3 text-white">Start Learning</h3>
                  <p className="text-gray-300 mb-6">
                    Enroll now to access all exercises and start earning XP!
                  </p>
                  <button 
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg border-2 border-yellow-600 hover:border-yellow-700 transition-all duration-200 font-game cursor-pointer"
                  >
                    {enrolling ? 'Enrolling...' : 'Enroll Now'}
                  </button>
                </div>
              )}

              {/* Help Card */}
              <div className="bg-slate-700 border-2 border-slate-600 rounded-2xl p-6 text-center">
                <div className="text-5xl mb-4">💬</div>
                <h3 className="text-2xl font-game mb-3 text-white">Need Help?</h3>
                <p className="text-gray-300 mb-4">
                  Join our community for support
                </p>
                <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bolder px-6 py-3 rounded-lg border-2 border-green-600 hover:border-green-700 transition-all duration-200 font-game cursor-pointer">
                  Go to Community
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
