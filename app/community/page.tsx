"use client"

import { Header } from '@/components/Header'
import { EmptyState } from '@/components/EmptyState'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { MessageSquare, Users, Heart, TrendingUp } from 'lucide-react'

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-green-950/20 to-zinc-950">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.1)_0%,transparent_50%)]" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block mb-6">
            <div className="text-8xl animate-bounce">👥</div>
          </div>
          <h1 className="text-6xl md:text-7xl font-game mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Community
          </h1>
          <p className="text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Connect with fellow learners and grow together
          </p>
        </div>
      </section>

      {/* Coming Soon Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-4 border-green-500/30 rounded-2xl p-12">
            <EmptyState
              icon="🌟"
              title="Community Coming Soon!"
              description="We're building a vibrant community space where you can ask questions, share knowledge, and connect with other developers."
            />

            {/* Feature Preview */}
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="bg-zinc-800 border-2 border-green-500/30 rounded-xl p-6 hover:border-green-500 transition-all cursor-pointer hover:scale-105">
                <MessageSquare className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-game mb-2 text-white">Discussion Forums</h3>
                <p className="text-gray-400 text-sm">
                  Ask questions and get help from the community
                </p>
              </div>

              <div className="bg-zinc-800 border-2 border-green-500/30 rounded-xl p-6 hover:border-green-500 transition-all cursor-pointer hover:scale-105">
                <Users className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-game mb-2 text-white">Study Groups</h3>
                <p className="text-gray-400 text-sm">
                  Join or create study groups with other learners
                </p>
              </div>

              <div className="bg-zinc-800 border-2 border-green-500/30 rounded-xl p-6 hover:border-green-500 transition-all cursor-pointer hover:scale-105">
                <Heart className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-game mb-2 text-white">Mentorship</h3>
                <p className="text-gray-400 text-sm">
                  Get guidance from experienced developers
                </p>
              </div>

              <div className="bg-zinc-800 border-2 border-green-500/30 rounded-xl p-6 hover:border-green-500 transition-all cursor-pointer hover:scale-105">
                <TrendingUp className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-game mb-2 text-white">Leaderboards</h3>
                <p className="text-gray-400 text-sm">
                  Compete and see how you rank among peers
                </p>
              </div>
            </div>

            {/* Temporary Discord/Social Links */}
            <div className="mt-12 p-6 bg-green-500/10 border-2 border-green-500/30 rounded-xl">
              <h3 className="text-2xl font-game mb-4 text-center text-white">
                Join Our Discord (Coming Soon)
              </h3>
              <p className="text-center text-gray-400 mb-6">
                Be the first to know when our community launches!
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/courses">
                  <Button variant="pixel" size="lg">
                    Start Learning
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
