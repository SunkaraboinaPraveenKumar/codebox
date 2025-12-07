"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { Sandpack } from '@codesandbox/sandpack-react'
import { ArrowLeft, ArrowRight, CheckCircle, Lightbulb, Star } from 'lucide-react'
import { toast } from 'sonner'

interface ExerciseData {
  chapter: {
    id: number
    courseId: number
    chapterId: number
    name: string
    description: string
    exercises: any[]
  }
  exercise: {
    id: number
    courseId: number
    chapterId: number
    exerciseId: string
    exerciseName: string
    exerciseContent: {
      content: string
      task: string
      hint: string
      hintXp: number
      starterCode: any
      output: string
      xp: number
    }
  }
  editorType: string
}

export default function ExercisePlayground() {
  const params = useParams()
  const router = useRouter()
  const { user } = useUser()
  const [exerciseData, setExerciseData] = useState<ExerciseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [completing, setCompleting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [sandpackKey, setSandpackKey] = useState(0)

  useEffect(() => {
    if (params.courseId && params.chapterId && params.exerciseSlug) {
      fetchExerciseData()
    }
  }, [params])

  const fetchExerciseData = async () => {
    try {
      const response = await axios.post('/api/exercise', {
        courseId: parseInt(params.courseId as string),
        chapterId: parseInt(params.chapterId as string),
        exerciseId: params.exerciseSlug as string
      })
      setExerciseData(response.data)
    } catch (error) {
      console.error('Error fetching exercise:', error)
      toast.error('Failed to load exercise')
    } finally {
      setLoading(false)
    }
  }

  const handleMarkComplete = async () => {
    if (!exerciseData || !user) return

    setCompleting(true)
    try {
      await axios.post('/api/exercise/complete', {
        courseId: exerciseData.exercise.courseId,
        chapterId: exerciseData.exercise.chapterId,
        exerciseId: getCurrentExerciseIndex() + 1,
        xpEarn: exerciseData.exercise.exerciseContent.xp
      })
      
      setIsCompleted(true)
      toast.success(`Exercise completed! +${exerciseData.exercise.exerciseContent.xp} XP`)
    } catch (error) {
      console.error('Error completing exercise:', error)
      toast.error('Failed to mark as complete')
    } finally {
      setCompleting(false)
    }
  }

  const getCurrentExerciseIndex = () => {
    if (!exerciseData) return 0
    return exerciseData.chapter.exercises.findIndex(ex => ex.slug === params.exerciseSlug)
  }

  const navigateToExercise = (direction: 'prev' | 'next') => {
    if (!exerciseData) return
    
    const currentIndex = getCurrentExerciseIndex()
    const exercises = exerciseData.chapter.exercises
    
    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1
    
    if (newIndex >= 0 && newIndex < exercises.length) {
      const nextExercise = exercises[newIndex]
      router.push(`/courses/${params.courseId}/${params.chapterId}/${nextExercise.slug}`)
    } else if (direction === 'next') {
      // Go back to course detail
      router.push(`/courses/${params.courseId}`)
    } else {
      // Go back to course detail
      router.push(`/courses/${params.courseId}`)
    }
  }

  const resetCode = () => {
    setSandpackKey(prev => prev + 1)
    toast.success('Code reset to starter template!')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-6">
            <img 
              src="/loading.gif" 
              alt="Loading..." 
              className="w-32 h-32 mx-auto"
            />
          </div>
          <p className="text-2xl font-game text-white mb-2">Loading exercise...</p>
          <p className="text-gray-400">Setting up your coding environment</p>
        </div>
      </div>
    )
  }

  if (!exerciseData) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center py-20 px-4">
          <div className="mb-6">
            <img 
              src="/programmer.gif" 
              alt="Not Found" 
              className="w-48 h-48 mx-auto rounded-lg"
            />
          </div>
          <h3 className="text-4xl font-game text-white mb-4">Exercise Not Found</h3>
          <p className="text-xl text-gray-400 mb-8">
            This exercise doesn't exist or has been removed.
          </p>
          <button 
            onClick={() => router.push(`/courses/${params.courseId}`)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg px-8 py-3 rounded-lg border-4 border-yellow-600 hover:border-yellow-700 transition-all duration-200 hover:scale-105 shadow-lg font-game cursor-pointer"
          >
            Back to Course
          </button>
        </div>
      </div>
    )
  }

  const { exercise, editorType } = exerciseData
  const currentIndex = getCurrentExerciseIndex()
  const totalExercises = exerciseData.chapter.exercises.length

  return (
    <div className="h-screen bg-slate-900 flex flex-col overflow-hidden">
      {/* Top Header - Fixed */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push(`/courses/${params.courseId}`)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back to Course</span>
            </button>
            <div className="text-gray-600">|</div>
            <h1 className="text-lg font-game text-white">
              {exercise.exerciseName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">{currentIndex + 1} of {totalExercises}</span>
            <button
              onClick={resetCode}
              className="text-sm px-3 py-1 bg-slate-600 hover:bg-slate-500 text-white rounded border border-slate-500 hover:border-slate-400 transition-all cursor-pointer"
            >
              Reset Code
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area - Flexible */}
      <div className="flex-1 flex min-h-0">
        {/* Left Panel - Content with Scrollable Area */}
        <div className="w-2/5 bg-slate-800 border-r border-slate-700 flex flex-col">
          {/* Content Header - Fixed */}
          <div className="bg-slate-700 px-6 py-3 border-b border-slate-600 flex-shrink-0">
            <h2 className="text-xl font-game text-white">
              {exercise.exerciseName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </h2>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Theory/Content */}
              <div>
                <div 
                  className="prose prose-invert prose-sm max-w-none text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: exercise.exerciseContent.content }}
                />
              </div>

              {/* Task Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-white text-sm font-bold">🎯</span>
                  </div>
                  <h3 className="text-lg font-game text-white">Task</h3>
                </div>
                <div className="bg-slate-700 rounded-lg p-4 border-l-4 border-blue-400">
                  <div 
                    className="prose prose-invert prose-sm max-w-none text-gray-300"
                    dangerouslySetInnerHTML={{ __html: exercise.exerciseContent.task }}
                  />
                </div>
              </div>

              {/* Hint Section */}
              <div>
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors mb-3 cursor-pointer"
                >
                  <div className="w-6 h-6 bg-yellow-500 rounded flex items-center justify-center">
                    <Lightbulb className="h-3 w-3 text-black" />
                  </div>
                  <span className="text-lg font-game">
                    {showHint ? 'Hide Hint' : 'Show Hint'}
                  </span>
                  <span className="text-sm text-gray-400">({exercise.exerciseContent.hintXp} XP)</span>
                </button>
                
                {showHint && (
                  <div className="bg-slate-700 rounded-lg p-4 border-l-4 border-yellow-400">
                    <div 
                      className="prose prose-invert prose-sm max-w-none text-gray-300"
                      dangerouslySetInnerHTML={{ __html: exercise.exerciseContent.hint }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Code Editor (Fixed Height) */}
        <div className="flex-1 flex flex-col">
          {/* Editor Header - Fixed */}
          <div className="bg-slate-700 border-b border-slate-600 px-4 py-2 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                <span className="text-white text-xs">📝</span>
              </div>
              <span className="text-white font-game">Code Editor</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs">Live Preview</span>
            </div>
          </div>
          
          {/* Sandpack Editor - Fixed Height */}
          <div className="flex-1 overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
            <Sandpack
              key={sandpackKey}
              template={editorType === 'react' ? 'react' : 'static'}
              files={exercise.exerciseContent.starterCode}
              theme="dark"
              options={{
                showNavigator: false,
                showTabs: true,
                showLineNumbers: true,
                showInlineErrors: true,
                wrapContent: true,
                editorHeight: 'calc(100vh - 200px)',
                autorun: true,
                autoReload: true,
                bundlerURL: undefined,
                startRoute: '/',
                showConsole: false,
                showConsoleButton: true,
                showRefreshButton: true,
                editorWidthPercentage: 50,
                resizablePanels: false,
              }}
              customSetup={{
                dependencies: editorType === 'react' ? {
                  'react': '^18.0.0',
                  'react-dom': '^18.0.0'
                } : {}
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Action Bar - Fixed */}
      <div className="bg-slate-800 border-t border-slate-700 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          {/* Left - Navigation */}
          <button
            onClick={() => navigateToExercise('prev')}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          {/* Center - XP and Completion */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="text-lg font-game text-white">
                You can earn {exercise.exerciseContent.xp} XP
              </span>
            </div>

            <button
              onClick={handleMarkComplete}
              disabled={completing || isCompleted}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all font-game cursor-pointer ${
                isCompleted 
                  ? 'bg-green-600 text-white cursor-not-allowed'
                  : 'bg-yellow-400 hover:bg-yellow-500 text-black hover:scale-105 shadow-lg'
              }`}
            >
              <CheckCircle className="h-4 w-4" />
              <span>{completing ? 'Completing...' : isCompleted ? 'Completed!' : 'Mark Completed'}</span>
            </button>
          </div>

          {/* Right - Navigation */}
          <button
            onClick={() => navigateToExercise('next')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all cursor-pointer hover:scale-105"
          >
            <span>Next</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}