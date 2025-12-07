"use client"

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Header } from '@/components/Header'
import { CourseCard } from '@/components/CourseCard'

interface Course {
  id: number
  courseId: number
  title: string
  description: string
  bannerImage: string
  level: string
  tags: string | null
  editorType: string | null
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/course')
      setCourses(response.data)
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      {/* Course Banner */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/course-banner.gif)' }}
        />
        <div className="absolute inset-0 bg-slate-900/50" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-game mb-6 text-white" style={{
            textShadow: '3px 3px 0px rgba(0,0,0,0.8)'
          }}>
            📚 Explore All Courses
          </h1>
          <p className="text-xl md:text-2xl text-white font-medium mb-8" style={{
            textShadow: '2px 2px 0px rgba(0,0,0,0.8)'
          }}>
            Choose from our collection of interactive coding courses
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-200">
            <span className="bg-slate-800/60 px-4 py-2 rounded-full border border-slate-600">
              🎯 Beginner Friendly
            </span>
            <span className="bg-slate-800/60 px-4 py-2 rounded-full border border-slate-600">
              💻 Interactive Coding
            </span>
            <span className="bg-slate-800/60 px-4 py-2 rounded-full border border-slate-600">
              🏆 Earn XP & Badges
            </span>
          </div>
        </div>
      </section>

      {/* Course List */}
      <section className="bg-slate-800 min-h-screen py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center text-white text-xl py-20">
              <div className="mb-6">
                <img 
                  src="/loading.gif" 
                  alt="Loading..." 
                  className="w-32 h-32 mx-auto"
                />
              </div>
              <p className="text-2xl font-game">Loading courses...</p>
              <p className="text-gray-400 mt-2">Please wait while we fetch the latest courses</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-20">
              <div className="mb-8">
                <img 
                  src="/programmer.gif" 
                  alt="No courses" 
                  className="w-48 h-48 mx-auto rounded-lg"
                />
              </div>
              <h3 className="text-4xl font-game text-white mb-4">No Courses Available</h3>
              <p className="text-xl text-gray-400 mb-8 max-w-md mx-auto">
                We're working hard to bring you amazing courses. Check back soon!
              </p>
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg px-8 py-3 rounded-lg border-4 border-yellow-600 hover:border-yellow-700 transition-all duration-200 hover:scale-105 shadow-lg font-game cursor-pointer">
                Get Notified When Available
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-game text-white mb-4">
                  {courses.length} Course{courses.length !== 1 ? 's' : ''} Available
                </h2>
                <p className="text-gray-400">Start your coding journey today!</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    courseId={course.courseId}
                    title={course.title}
                    description={course.description}
                    bannerImage={course.bannerImage}
                    level={course.level}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
