"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Heart, MessageCircle, Clock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PostCardProps {
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

export function PostCard({
  id,
  title,
  content,
  category,
  tags,
  likes,
  replies,
  createdAt,
  userId,
  userDisplayName,
  userAvatar
}: PostCardProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)

  const handleLike = async () => {
    // TODO: Implement like functionality
    setLiked(!liked)
    setLikeCount(prev => liked ? prev - 1 : prev + 1)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'general': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'help': 'bg-red-500/20 text-red-400 border-red-500/30',
      'showcase': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'resources': 'bg-green-500/20 text-green-400 border-green-500/30',
      'jobs': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    }
    return colors[category as keyof typeof colors] || colors.general
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-200 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
            {userAvatar ? (
              <img src={userAvatar} alt={userDisplayName} className="w-10 h-10 rounded-full" />
            ) : (
              <User className="w-5 h-5 text-primary" />
            )}
          </div>
          <div>
            <p className="font-semibold text-foreground">
              {userDisplayName || 'Anonymous User'}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-3 h-3" />
              {formatDate(createdAt)}
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(category)}`}>
          {category}
        </span>
      </div>

      {/* Content */}
      <Link href={`/community/post/${id}`} className="block group">
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {content}
        </p>
      </Link>

      {/* Tags */}
      {tags && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.split(',').filter(tag => tag.trim()).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
            >
              #{tag.trim()}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`flex items-center gap-2 ${liked ? 'text-red-500' : 'text-muted-foreground'} hover:text-red-500`}
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
            {likeCount}
          </Button>
          <Link href={`/community/post/${id}`}>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
              <MessageCircle className="w-4 h-4" />
              {replies}
            </Button>
          </Link>
        </div>
        <Link href={`/community/post/${id}`}>
          <Button variant="outline" size="sm">
            View Discussion
          </Button>
        </Link>
      </div>
    </div>
  )
}