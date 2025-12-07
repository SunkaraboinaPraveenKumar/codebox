"use client"

import { Header } from '@/components/Header'
import { EmptyState } from '@/components/EmptyState'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Code2, Rocket, Sparkles } from 'lucide-react'

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-orange-950/20 to-zinc-950">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/hero3.gif)' }}
        />
        <div className="absolute inset-0 bg-slate-900/50" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-game mb-6 text-white" style={{
            textShadow: '3px 3px 0px rgba(0,0,0,0.8)'
          }}>
            🛠️ Projects
          </h1>
          <p className="text-xl md:text-2xl text-white font-medium mb-8" style={{
            textShadow: '2px 2px 0px rgba(0,0,0,0.8)'
          }}>
            Build real-world projects and showcase your skills
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-200">
            <span className="bg-slate-800/60 px-4 py-2 rounded-full border border-slate-600">
              🚀 Real-World Projects
            </span>
            <span className="bg-slate-800/60 px-4 py-2 rounded-full border border-slate-600">
              💼 Portfolio Ready
            </span>
            <span className="bg-slate-800/60 px-4 py-2 rounded-full border border-slate-600">
              🎨 Creative Freedom
            </span>
          </div>
        </div>
      </section>

      {/* Coming Soon Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-4 border-orange-500/30 rounded-2xl p-12">
            <EmptyState
              icon="🛠️"
              title="Projects Coming Soon!"
              description="We're building an amazing project showcase where you can build, share, and discover coding projects. Stay tuned!"
            />

            {/* Feature Preview */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-zinc-800 border-2 border-orange-500/30 rounded-xl p-6 text-center hover:border-orange-500 transition-all cursor-pointer hover:scale-105">
                <Code2 className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-game mb-2 text-white">Build Projects</h3>
                <p className="text-gray-400 text-sm">
                  Create real-world applications with guided tutorials
                </p>
              </div>

              <div className="bg-zinc-800 border-2 border-orange-500/30 rounded-xl p-6 text-center hover:border-orange-500 transition-all cursor-pointer hover:scale-105">
                <Sparkles className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-game mb-2 text-white">Showcase Work</h3>
                <p className="text-gray-400 text-sm">
                  Share your projects with the community
                </p>
              </div>

              <div className="bg-zinc-800 border-2 border-orange-500/30 rounded-xl p-6 text-center hover:border-orange-500 transition-all cursor-pointer hover:scale-105">
                <Rocket className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-game mb-2 text-white">Get Feedback</h3>
                <p className="text-gray-400 text-sm">
                  Receive reviews and improve your skills
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <p className="text-gray-400 mb-6">
                In the meantime, start learning with our courses!
              </p>
              <Link href="/courses">
                <Button variant="pixel" size="lg">
                  Browse Courses →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
