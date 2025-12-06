"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { Header } from '@/components/Header'
import { CourseCard } from '@/components/CourseCard'
import { Button } from '@/components/ui/button'

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

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/course')
      setCourses(response.data.slice(0, 4)) // Show only first 4 courses
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/home.png)' }}
        />
        <div className="absolute inset-0 bg-slate-900/40" />
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-7xl font-bold font-game mb-2 text-white" style={{
            textShadow: '3px 3px 0px rgba(0,0,0,0.8)'
          }}>
            Start Your
          </h1>
          <h1 className="text-7xl md:text-8xl font-bold font-game mb-8 text-yellow-400" style={{
            textShadow: '3px 3px 0px rgba(0,0,0,0.8)'
          }}>
            Coding Adventure
          </h1>
          <p className="text-xl md:text-2xl text-white mb-12 font-medium" style={{
            textShadow: '2px 2px 0px rgba(0,0,0,0.8)'
          }}>
            Beginner friendly coding courses and projects
          </p>
          <Link href="/sign-in">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xl px-8 py-4 rounded-lg border-4 border-yellow-600 hover:border-yellow-700 transition-all duration-200 hover:scale-105 shadow-lg font-game cursor-pointer">
              GET STARTED
            </button>
          </Link>
        </div>
      </section>

      {/* Available Courses Section */}
      <section className="bg-slate-800 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-game mb-4 text-white" style={{
              textShadow: '2px 2px 0px rgba(0,0,0,0.8)'
            }}>
              Available Courses
            </h2>
            <p className="text-lg md:text-xl text-gray-300">Choose your learning path and start coding today!</p>
          </div>
          
          {loading ? (
            <div className="text-center text-white text-xl">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent"></div>
              <p className="mt-4">Loading courses...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
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
              
              <div className="text-center">
                <Link href="/courses">
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg px-8 py-3 rounded-lg border-4 border-yellow-600 hover:border-yellow-700 transition-all duration-200 hover:scale-105 shadow-lg font-game cursor-pointer">
                    View All Courses →
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
