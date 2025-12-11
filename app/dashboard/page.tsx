"use client"

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { CourseCard } from '@/components/CourseCard'
import { useUserDetail } from '@/context/UserDetailContext'

interface EnrolledCourse {
  courseId: number
  title: string
  description: string
  bannerImage: string
  level: string
  totalExercises: number
  completedExercises: number
  xpEarned: number
}

interface UserStats {
  totalXP: number
  badges: number
  dayStreak: number
  learningProgress: {
    coursesEnrolled: number
    exercisesCompleted: number
    coursesCompleted: number
  }
  achievements: {
    firstCourse: boolean
    firstExercise: boolean
    xp100: boolean
    xp500: boolean
    xp1000: boolean
    exercises10: boolean
    exercises50: boolean
    courses3: boolean
  }
}

export default function DashboardPage() {
  const { user } = useUser()
  const { userDetail } = useUserDetail()
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([])
  const [allCourses, setAllCourses] = useState<any[]>([])
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [enrolledRes, allCoursesRes, statsRes] = await Promise.all([
        axios.get('/api/course?courseId=enroll'),
        axios.get('/api/course'),
        axios.get('/api/user/stats')
      ])
      setEnrolledCourses(enrolledRes.data)
      setAllCourses(allCoursesRes.data.slice(0, 5))
      setUserStats(statsRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-3 space-y-8">
            {/* Welcome Banner */}
            <div className="border-4 border-yellow-500/30 rounded-2xl p-6 flex items-center gap-6 hover:border-yellow-500 transition-all" style={{
              background: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)'
            }}>
              <div className="flex-shrink-0">
                <img 
                  src="/alex_walk.gif" 
                  alt="Welcome" 
                  className="w-24 h-24 rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-game mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Welcome back, {user?.firstName || 'Learner'}!
                </h2>
                <p className="text-gray-300 text-lg mb-2">
                  🚀 Continue your coding journey and earn more XP
                </p>
                {userStats && !loading && (
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>⭐ {userStats.totalXP} XP</span>
                    <span>🏆 {userStats.badges} badges</span>
                    <span>🔥 {userStats.dayStreak} day streak</span>
                  </div>
                )}
              </div>
            </div>

            {/* Enrolled Courses */}
            <div>
              <h3 className="text-4xl font-game mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                📚 Your Enrolled Courses
              </h3>
              
              {loading ? (
                <div className="text-center py-12">
                  <div className="mb-4">
                    <img 
                      src="/loading.gif" 
                      alt="Loading..." 
                      className="w-24 h-24 mx-auto"
                    />
                  </div>
                  <p className="text-gray-400">Loading your courses...</p>
                </div>
              ) : enrolledCourses.length === 0 ? (
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-4 border-yellow-500/30 rounded-2xl p-12">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="mb-6">
                      <img 
                        src="/programmer.gif" 
                        alt="No courses" 
                        className="w-48 h-48 mx-auto rounded-lg"
                      />
                    </div>
                    <h4 className="text-3xl font-game mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                      No Courses Yet
                    </h4>
                    <p className="text-xl text-gray-400 mb-8 max-w-md">
                      Start your learning journey by enrolling in a course!
                    </p>
                    <Link href="/courses">
                      <Button variant="pixel" size="lg">
                        Browse All Courses →
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrolledCourses.map((course) => (
                    <Link key={course.courseId} href={`/courses/${course.courseId}`}>
                      <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-4 border-yellow-500/30 rounded-2xl overflow-hidden hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/50 transition-all cursor-pointer hover:scale-105">
                        <div className="relative h-36 w-full overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10"></div>
                          <Image
                            src={course.bannerImage}
                            alt={course.title}
                            fill
                            className="object-cover hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="text-2xl font-game mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                            {course.title}
                          </h4>
                          <p className="text-sm text-gray-400 mb-3">
                            {course.completedExercises} / {course.totalExercises} exercises
                          </p>
                          <Progress 
                            value={(course.completedExercises / course.totalExercises) * 100} 
                            className="mb-3 h-2"
                          />
                          <div className="flex items-center gap-2 bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full text-sm font-bold inline-flex">
                            <span>⭐</span>
                            <span>{course.xpEarned} XP</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Explore More */}
            <div>
              <h3 className="text-4xl font-game mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                🎯 Explore More
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'All Courses', emoji: '📚', link: '/courses', color: 'from-blue-500 to-purple-500' },
                  { name: 'Community', emoji: '👥', link: '/community', color: 'from-green-500 to-emerald-500' },
                  { name: 'Projects', emoji: '🚀', link: '/projects', color: 'from-orange-500 to-red-500' },
                  { name: 'Pricing', emoji: '💎', link: '/pricing', color: 'from-yellow-500 to-orange-500' },
                ].map((item) => (
                  <Link key={item.name} href={item.link}>
                    <div className={`flex items-center gap-3 p-4 bg-gradient-to-r ${item.color} bg-opacity-10 border-2 border-zinc-700 rounded-xl hover:border-opacity-100 hover:scale-105 transition-all cursor-pointer`}>
                      <div className="text-4xl">{item.emoji}</div>
                      <span className="text-lg font-game text-white">{item.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Explore Other Courses */}
            <div>
              <h3 className="text-4xl font-game mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                🎓 Explore Other Courses
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {allCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    courseId={course.courseId}
                    title={course.title}
                    description={course.description}
                    bannerImage={course.bannerImage}
                    level={course.level}
                    smallerCard
                  />
                ))}
              </div>
              <div className="text-center">
                <Link href="/courses">
                  <Button variant="pixel" className="bg-yellow-400 hover:bg-yellow-500 text-black border-yellow-600 hover:border-yellow-700">
                    View All →
                  </Button>
                </Link>
              </div>
            </div>

            {/* Invite Friend */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-4 border-pink-500/30 rounded-xl p-6 hover:border-pink-500 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-6xl">📧</div>
                <div>
                  <h3 className="text-3xl font-game bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    Invite Friend
                  </h3>
                  <p className="text-gray-400">Share Codebox with your friends</p>
                </div>
              </div>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="friend@example.com"
                  className="flex-1 px-4 py-2 bg-zinc-800 border-2 border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
                />
                <Button variant="pixel" className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 border-pink-400">
                  Invite
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* User Status */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-4 border-yellow-500/30 rounded-2xl p-6 hover:border-yellow-500 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-6xl">👤</div>
                <div className="flex-1">
                  <p className="text-lg font-game text-gray-300 break-all">{user?.emailAddresses[0]?.emailAddress}</p>
                  {userStats && (
                    <p className="text-sm text-gray-400 mt-1">
                      {userStats.learningProgress.coursesEnrolled} courses • {userStats.learningProgress.exercisesCompleted} exercises completed
                    </p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/30 rounded-lg hover:border-yellow-500 hover:scale-110 transition-all duration-200 cursor-pointer">
                  <div className="text-4xl">⭐</div>
                  {loading ? (
                    <div className="animate-pulse bg-yellow-500/30 h-8 w-16 rounded"></div>
                  ) : (
                    <p className="text-3xl font-bold text-yellow-500">{userStats?.totalXP || userDetail?.points || 0}</p>
                  )}
                  <p className="text-sm text-gray-300 font-semibold">Total XP</p>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/30 rounded-lg hover:border-purple-500 hover:scale-110 transition-all duration-200 cursor-pointer">
                  <div className="text-4xl">🏆</div>
                  {loading ? (
                    <div className="animate-pulse bg-purple-400/30 h-8 w-12 rounded"></div>
                  ) : (
                    <p className="text-3xl font-bold text-purple-400">{userStats?.badges || 0}</p>
                  )}
                  <p className="text-sm text-gray-300 font-semibold">Badges</p>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-red-500/20 to-orange-500/20 border-2 border-red-500/30 rounded-lg col-span-2 hover:border-red-500 hover:scale-110 transition-all duration-200 cursor-pointer">
                  <div className="text-4xl">🔥</div>
                  {loading ? (
                    <div className="animate-pulse bg-red-500/30 h-8 w-12 rounded"></div>
                  ) : (
                    <p className="text-3xl font-bold text-red-500">{userStats?.dayStreak || 0}</p>
                  )}
                  <p className="text-sm text-gray-300 font-semibold">Day Streak</p>
                </div>
              </div>
            </div>

            {/* Achievements */}
            {userStats && userStats.badges > 0 && (
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-4 border-yellow-500/30 rounded-2xl p-6 hover:border-yellow-500 hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-5xl">🎖️</div>
                  <h3 className="text-2xl font-game text-white">Achievements</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {userStats.achievements.firstCourse && (
                    <div className="flex items-center gap-2 p-2 bg-blue-500/20 border border-blue-500/30 rounded-lg hover:border-blue-500 hover:scale-110 transition-all duration-200 cursor-pointer">
                      <span className="text-2xl">🎓</span>
                      <span className="text-xs text-blue-300 font-semibold">First Course</span>
                    </div>
                  )}
                  {userStats.achievements.firstExercise && (
                    <div className="flex items-center gap-2 p-2 bg-green-500/20 border border-green-500/30 rounded-lg hover:border-green-500 hover:scale-110 transition-all duration-200 cursor-pointer">
                      <span className="text-2xl">✅</span>
                      <span className="text-xs text-green-300 font-semibold">First Exercise</span>
                    </div>
                  )}
                  {userStats.achievements.xp100 && (
                    <div className="flex items-center gap-2 p-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg hover:border-yellow-500 hover:scale-110 transition-all duration-200 cursor-pointer">
                      <span className="text-2xl">⭐</span>
                      <span className="text-xs text-yellow-300 font-semibold">100 XP</span>
                    </div>
                  )}
                  {userStats.achievements.xp500 && (
                    <div className="flex items-center gap-2 p-2 bg-orange-500/20 border border-orange-500/30 rounded-lg hover:border-orange-500 hover:scale-110 transition-all duration-200 cursor-pointer">
                      <span className="text-2xl">🌟</span>
                      <span className="text-xs text-orange-300 font-semibold">500 XP</span>
                    </div>
                  )}
                  {userStats.achievements.xp1000 && (
                    <div className="flex items-center gap-2 p-2 bg-purple-500/20 border border-purple-500/30 rounded-lg hover:border-purple-500 hover:scale-110 transition-all duration-200 cursor-pointer">
                      <span className="text-2xl">💫</span>
                      <span className="text-xs text-purple-300 font-semibold">1000 XP</span>
                    </div>
                  )}
                  {userStats.achievements.exercises10 && (
                    <div className="flex items-center gap-2 p-2 bg-cyan-500/20 border border-cyan-500/30 rounded-lg hover:border-cyan-500 hover:scale-110 transition-all duration-200 cursor-pointer">
                      <span className="text-2xl">🎯</span>
                      <span className="text-xs text-cyan-300 font-semibold">10 Exercises</span>
                    </div>
                  )}
                  {userStats.achievements.exercises50 && (
                    <div className="flex items-center gap-2 p-2 bg-pink-500/20 border border-pink-500/30 rounded-lg hover:border-pink-500 hover:scale-110 transition-all duration-200 cursor-pointer">
                      <span className="text-2xl">🚀</span>
                      <span className="text-xs text-pink-300 font-semibold">50 Exercises</span>
                    </div>
                  )}
                  {userStats.achievements.courses3 && (
                    <div className="flex items-center gap-2 p-2 bg-indigo-500/20 border border-indigo-500/30 rounded-lg hover:border-indigo-500 hover:scale-110 transition-all duration-200 cursor-pointer">
                      <span className="text-2xl">📚</span>
                      <span className="text-xs text-indigo-300 font-semibold">3 Courses</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Upgrade to Pro */}
            {!userDetail?.subscription && (
              <div className="bg-gradient-to-br from-purple-900 to-blue-900 border-4 border-purple-500 rounded-2xl p-6 text-center hover:scale-105 transition-transform">
                <div className="text-6xl mb-4">💎</div>
                <h3 className="text-3xl font-game mb-3 text-white">Upgrade to Pro</h3>
                <p className="text-gray-200 mb-6">
                  Unlock all courses and features!
                </p>
                <Link href="/pricing">
                  <Button variant="pixel" className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 border-yellow-400">
                    ⚡ Upgrade Now
                  </Button>
                </Link>
              </div>
            )}

            {/* Community Help */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-4 border-green-500/30 rounded-xl p-6 text-center hover:border-green-500 transition-all">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-3xl font-game mb-3 text-white">Need Help?</h3>
              <p className="text-gray-400 mb-4">Join our community</p>
              <Link href="/community">
                <Button variant="pixel" className="w-full bg-green-600 hover:bg-green-700 border-green-400">
                  Go to Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
