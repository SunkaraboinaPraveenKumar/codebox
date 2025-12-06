"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useUser, UserButton } from '@clerk/nextjs'
import { Button } from './ui/button'

export function Header() {
  const { isSignedIn } = useUser()

  return (
    <header className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer">
          <Image
            src="/logo.png"
            alt="Codebox"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="text-2xl font-game text-white">
            CodeBox
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <div className="relative group">
            <Link href="/courses" className="text-white hover:text-yellow-400 transition-colors cursor-pointer font-medium">
              Courses
            </Link>
          </div>
          <Link href="/projects" className="text-white hover:text-yellow-400 transition-colors cursor-pointer font-medium">
            Projects
          </Link>
          <Link href="/pricing" className="text-white hover:text-yellow-400 transition-colors cursor-pointer font-medium">
            Pricing
          </Link>
          <Link href="/contact" className="text-white hover:text-yellow-400 transition-colors cursor-pointer font-medium">
            Contact Us
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <>
              <Link href="/dashboard">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 rounded-lg border-2 border-yellow-600 hover:border-yellow-700 transition-all duration-200 font-game cursor-pointer">
                  Dashboard
                </button>
              </Link>
              <div className="hover:scale-110 transition-transform">
                <UserButton />
              </div>
            </>
          ) : (
            <Link href="/sign-in">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded-lg border-2 border-yellow-600 hover:border-yellow-700 transition-all duration-200 font-game cursor-pointer">
                Signup
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
