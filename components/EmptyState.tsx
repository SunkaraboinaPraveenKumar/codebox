"use client"

import { Button } from "./ui/button"
import Link from "next/link"

interface EmptyStateProps {
  icon?: string
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
  className?: string
}

export function EmptyState({
  icon = "📦",
  title,
  description,
  actionLabel,
  actionHref,
  className = ""
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-12 ${className}`}>
      <div className="text-8xl mb-6 animate-bounce">{icon}</div>
      <h3 className="text-3xl font-game mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        {title}
      </h3>
      <p className="text-xl text-gray-400 mb-8 max-w-md">
        {description}
      </p>
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button variant="pixel" size="lg">
            {actionLabel}
          </Button>
        </Link>
      )}
    </div>
  )
}
