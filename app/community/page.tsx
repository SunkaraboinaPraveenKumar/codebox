"use client"

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { PostCard } from '@/components/community/PostCard'
import { CreatePostModal } from '@/components/community/CreatePostModal'
import { Plus, Filter, Search, TrendingUp, MessageSquare, Users, Heart } from 'lucide-react'
import axios from 'axios'

interface Post {
  id: number
  title: string
  content: string
  category: string
  tags: string
  likes: number
  replies: number
  createdAt: string
  userId: string
  userDisplayName?: string
  userAvatar?: string
}

const categories = [
  { value: 'all', label: 'All Posts', icon: MessageSquare },
  { value: 'general', label: 'General', icon: MessageSquare },
  { value: 'help', label: 'Help & Support', icon: Heart },
  { value: 'showcase', label: 'Show & Tell', icon: TrendingUp },
  { value: 'resources', label: 'Resources', icon: Users },
  { value: 'jobs', label: 'Jobs', icon: TrendingUp },
]

export default function CommunityPage() {
  const { isSignedIn } = useUser()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [selectedCategory])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/community/posts?category=${selectedCategory}&limit=20`)
      setPosts(response.data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.1)_0%,transparent_50%)]" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-game mb-4 text-foreground">
            💬 Community
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with fellow learners, share knowledge, and grow together
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">{posts.length}</div>
              <div className="text-sm text-muted-foreground">Posts</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">
                {posts.reduce((sum, post) => sum + post.replies, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Replies</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">
                {posts.reduce((sum, post) => sum + post.likes, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Likes</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">
                {new Set(posts.map(post => post.userId)).size}
              </div>
              <div className="text-sm text-muted-foreground">Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Create Post Button */}
              {isSignedIn && (
                <Button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  size="lg"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Post
                </Button>
              )}

              {/* Categories */}
              <div className="bg-card border border-border rounded-xl p-4">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const Icon = category.icon
                    return (
                      <button
                        key={category.value}
                        onClick={() => setSelectedCategory(category.value)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          selectedCategory === category.value
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {category.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Community Guidelines */}
              <div className="bg-card border border-border rounded-xl p-4">
                <h3 className="font-semibold text-foreground mb-3">Community Guidelines</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Be respectful and kind</li>
                  <li>• Search before posting</li>
                  <li>• Use descriptive titles</li>
                  <li>• Help others learn</li>
                  <li>• No spam or self-promotion</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Posts */}
            {loading ? (
              <div className="text-center py-12">
                <div className="mb-4">
                  <img 
                    src="/loading.gif" 
                    alt="Loading..." 
                    className="w-24 h-24 mx-auto"
                  />
                </div>
                <p className="text-muted-foreground">Loading community posts...</p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <div className="mb-6">
                  <img 
                    src="/programmer.gif" 
                    alt="No posts" 
                    className="w-48 h-48 mx-auto rounded-lg"
                  />
                </div>
                <h3 className="text-2xl font-game text-foreground mb-4">
                  {searchQuery ? 'No posts found' : 'No posts yet'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery 
                    ? 'Try adjusting your search terms'
                    : 'Be the first to start a discussion!'
                  }
                </p>
                {isSignedIn && !searchQuery && (
                  <Button onClick={() => setIsCreateModalOpen(true)}>
                    Create First Post
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <PostCard key={post.id} {...post} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onPostCreated={fetchPosts}
      />
    </div>
  )
}
