"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Card } from './ui/card'

interface CourseCardProps {
  courseId: number
  title: string
  description: string
  bannerImage: string
  level: string
  smallerCard?: boolean
}

export function CourseCard({ courseId, title, description, bannerImage, level, smallerCard = false }: CourseCardProps) {
  const levelColors: Record<string, string> = {
    beginner: 'from-green-500 to-emerald-500 border-green-400',
    intermediate: 'from-yellow-500 to-orange-500 border-yellow-400',
    advanced: 'from-red-500 to-pink-500 border-red-400',
  }

  const levelColor = levelColors[level] || levelColors.beginner

  return (
    <Link href={`/courses/${courseId}`}>
      <Card className={`overflow-hidden border-2 border-slate-600 rounded-xl hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-400/20 transition-all cursor-pointer hover:scale-105 bg-slate-700 ${smallerCard ? 'h-auto' : ''}`}>
        <div className={`relative ${smallerCard ? 'h-32' : 'h-48'} w-full overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-700 via-transparent to-transparent z-10"></div>
          <Image
            src={bannerImage}
            alt={title}
            fill
            className="object-cover hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className={`font-game ${smallerCard ? 'text-xl' : 'text-2xl'} mb-2 text-white`}>
            {title}
          </h3>
          <p className={`text-gray-300 ${smallerCard ? 'text-sm line-clamp-1' : 'text-base line-clamp-2'} mb-3`}>
            {description}
          </p>
          <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${levelColor} px-3 py-1 rounded-2xl text-sm font-semibold text-white border-2 shadow-lg`}>
            <span>⭐</span>
            <span className="capitalize">{level}</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
