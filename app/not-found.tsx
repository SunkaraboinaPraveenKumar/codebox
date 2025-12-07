import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/Header'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-red-950/20 to-zinc-950">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <img 
              src="/programmer.gif" 
              alt="404 Not Found" 
              className="w-64 h-64 mx-auto rounded-lg"
            />
          </div>
          
          <h1 className="text-8xl font-game mb-6 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
            404
          </h1>
          
          <h2 className="text-4xl font-game mb-6 text-white">
            Page Not Found
          </h2>
          
          <p className="text-xl text-gray-400 mb-12">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="pixel" size="lg">
                🏠 Go Home
              </Button>
            </Link>
            <Link href="/courses">
              <Button variant="pixel" size="lg" className="bg-blue-600 hover:bg-blue-700 border-blue-400">
                📚 Browse Courses
              </Button>
            </Link>
          </div>
          
          <div className="mt-16 p-6 bg-zinc-900 border-2 border-zinc-800 rounded-xl">
            <h3 className="text-2xl font-game mb-4 text-white">Quick Links</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/dashboard" className="text-purple-400 hover:text-purple-300 transition-colors">
                Dashboard
              </Link>
              <Link href="/pricing" className="text-purple-400 hover:text-purple-300 transition-colors">
                Pricing
              </Link>
              <Link href="/community" className="text-purple-400 hover:text-purple-300 transition-colors">
                Community
              </Link>
              <Link href="/contact" className="text-purple-400 hover:text-purple-300 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
