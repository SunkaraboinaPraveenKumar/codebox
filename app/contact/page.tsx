"use client"

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, MessageSquare, Send, MapPin } from 'lucide-react'
import { toast } from 'sonner'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    
    // Simulate sending
    setTimeout(() => {
      toast.success('Message sent! We\'ll get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setSending(false)
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-yellow-950/20 to-zinc-950">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.1)_0%,transparent_50%)]" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block mb-6">
            <div className="text-8xl animate-bounce">📧</div>
          </div>
          <h1 className="text-6xl md:text-7xl font-game mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-4 border-yellow-500/30 rounded-2xl p-8">
              <h2 className="text-3xl font-game mb-6 text-white flex items-center gap-3">
                <Send className="h-8 w-8 text-yellow-500" />
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more..."
                    required
                    rows={6}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="pixel" 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 border-yellow-400"
                  disabled={sending}
                >
                  {sending ? 'Sending...' : 'Send Message 📨'}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Email Card */}
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-4 border-blue-500/30 rounded-2xl p-8 hover:border-blue-500 transition-all cursor-pointer hover:scale-105">
                <Mail className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-2xl font-game mb-2 text-white">Email Us</h3>
                <p className="text-gray-400 mb-4">
                  Send us an email anytime
                </p>
                <a 
                  href="mailto:support@codebox.com" 
                  className="text-blue-400 hover:text-blue-300 font-semibold"
                >
                  support@codebox.com
                </a>
              </div>

              {/* Community Card */}
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-4 border-green-500/30 rounded-2xl p-8 hover:border-green-500 transition-all cursor-pointer hover:scale-105">
                <MessageSquare className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-2xl font-game mb-2 text-white">Join Community</h3>
                <p className="text-gray-400 mb-4">
                  Get help from our community
                </p>
                <a 
                  href="/community" 
                  className="text-green-400 hover:text-green-300 font-semibold"
                >
                  Visit Community →
                </a>
              </div>

              {/* Location Card */}
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-4 border-purple-500/30 rounded-2xl p-8">
                <MapPin className="h-12 w-12 text-purple-500 mb-4" />
                <h3 className="text-2xl font-game mb-2 text-white">Location</h3>
                <p className="text-gray-400">
                  Remote-first company<br />
                  Serving learners worldwide 🌍
                </p>
              </div>

              {/* FAQ Link */}
              <div className="bg-gradient-to-br from-yellow-900 to-orange-900 border-4 border-yellow-500 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">❓</div>
                <h3 className="text-2xl font-game mb-3 text-white">Quick Questions?</h3>
                <p className="text-gray-300 mb-6">
                  Check out our FAQ for instant answers
                </p>
                <Button variant="pixel" className="w-full">
                  View FAQ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
