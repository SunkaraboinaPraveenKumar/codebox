import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Check, Zap, Crown } from 'lucide-react'
import Link from 'next/link'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-yellow-950/20 to-zinc-950">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.1)_0%,transparent_50%)]" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block mb-6">
            <div className="text-8xl animate-bounce">💎</div>
          </div>
          <h1 className="text-6xl md:text-7xl font-game mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Pricing Plans
          </h1>
          <p className="text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Choose the perfect plan for your learning journey
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-4 border-zinc-700 rounded-2xl p-8 hover:border-zinc-600 transition-all hover:scale-105">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-10 w-10 text-blue-500" />
              <h3 className="text-4xl font-game text-white">Free</h3>
            </div>
            <div className="mb-6">
              <p className="text-6xl font-bold text-white mb-2">$0</p>
              <p className="text-gray-400">Forever free</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="h-6 w-6 text-green-500 shrink-0 mt-1" />
                <span className="text-gray-300">Access to 2 chapters per course</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-6 w-6 text-green-500 shrink-0 mt-1" />
                <span className="text-gray-300">Basic exercises</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-6 w-6 text-green-500 shrink-0 mt-1" />
                <span className="text-gray-300">Community support</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-6 w-6 text-green-500 shrink-0 mt-1" />
                <span className="text-gray-300">Progress tracking</span>
              </li>
            </ul>
            <Link href="/sign-up">
              <Button variant="outline" size="lg" className="w-full text-lg">
                Get Started Free
              </Button>
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 border-4 border-yellow-500 rounded-2xl p-8 relative hover:scale-105 transition-all shadow-2xl shadow-yellow-500/20">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
              <Crown className="h-4 w-4" />
              MOST POPULAR
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <Crown className="h-10 w-10 text-yellow-400" />
              <h3 className="text-4xl font-game text-white">Pro</h3>
            </div>
            
            <div className="mb-6">
              <p className="text-6xl font-bold text-white mb-2">
                $7.99
                <span className="text-2xl text-gray-300">/month</span>
              </p>
              <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold">
                <Zap className="h-4 w-4" />
                2-day free trial
              </div>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="h-6 w-6 text-yellow-400 shrink-0 mt-1" />
                <span className="text-white font-semibold">Unlimited access to all courses</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-6 w-6 text-yellow-400 shrink-0 mt-1" />
                <span className="text-white font-semibold">All pro courses & chapters</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-6 w-6 text-yellow-400 shrink-0 mt-1" />
                <span className="text-white font-semibold">Unlimited exercises</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-6 w-6 text-yellow-400 shrink-0 mt-1" />
                <span className="text-white font-semibold">Priority support (Discord & Email)</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-6 w-6 text-yellow-400 shrink-0 mt-1" />
                <span className="text-white font-semibold">Exclusive pro projects</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-6 w-6 text-yellow-400 shrink-0 mt-1" />
                <span className="text-white font-semibold">Certificates of completion</span>
              </li>
            </ul>
            
            <Button 
              variant="pixel" 
              size="lg" 
              className="w-full text-xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 border-yellow-400"
            >
              ⚡ Upgrade to Pro
            </Button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-20">
          <h2 className="text-4xl font-game text-center mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-zinc-900 border-2 border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-game mb-2 text-white">Can I cancel anytime?</h3>
              <p className="text-gray-400">Yes! You can cancel your subscription at any time. No questions asked.</p>
            </div>
            
            <div className="bg-zinc-900 border-2 border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-game mb-2 text-white">What payment methods do you accept?</h3>
              <p className="text-gray-400">We accept all major credit cards through Stripe secure payment processing.</p>
            </div>
            
            <div className="bg-zinc-900 border-2 border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-game mb-2 text-white">Is there a student discount?</h3>
              <p className="text-gray-400">Yes! Contact us with your student ID for a special discount code.</p>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="text-center mt-16 p-6 bg-blue-500/10 border-2 border-blue-500/30 rounded-xl max-w-2xl mx-auto">
          <p className="text-blue-400 font-semibold mb-2">💡 Developer Note</p>
          <p className="text-gray-400 text-sm">
            Clerk Billing integration will be added here. Configure Clerk Billing in your Clerk Dashboard to enable payments.
          </p>
        </div>
      </div>
    </div>
  )
}
