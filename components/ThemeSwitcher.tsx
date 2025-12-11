"use client"

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Palette, Moon, Sun, Gamepad2, Waves, Sunset, TreePine, Zap } from 'lucide-react'

const themes = [
  {
    name: 'dark',
    label: 'Dark Mode',
    icon: Moon,
    description: 'Classic dark theme'
  },
  {
    name: 'gaming',
    label: 'Gaming Mode',
    icon: Gamepad2,
    description: 'Neon gaming vibes'
  },
  {
    name: 'retro',
    label: 'Retro Mode', 
    icon: Zap,
    description: '80s synthwave'
  },
  {
    name: 'ocean',
    label: 'Ocean Mode',
    icon: Waves,
    description: 'Blue ocean depths'
  },
  {
    name: 'nature',
    label: 'Nature Mode',
    icon: TreePine,
    description: 'Earth & forest tones'
  },
  {
    name: 'sunset',
    label: 'Sunset Mode',
    icon: Sunset,
    description: 'Warm sunset colors'
  }
]

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="w-9 h-9 p-0">
        <Palette className="h-4 w-4" />
      </Button>
    )
  }

  const currentTheme = themes.find(t => t.name === theme) || themes[0]
  const CurrentIcon = currentTheme.icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-9 h-9 p-0 border-2 hover:scale-105 transition-all duration-200"
        >
          <CurrentIcon className="h-4 w-4" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-2">
        {themes.map((themeOption) => {
          const Icon = themeOption.icon
          return (
            <DropdownMenuItem
              key={themeOption.name}
              onClick={() => setTheme(themeOption.name)}
              className={`flex items-center gap-3 p-4 mb-1 cursor-pointer rounded-lg hover:bg-accent/50 transition-colors ${
                theme === themeOption.name ? 'bg-accent border border-primary/20' : ''
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{themeOption.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5 truncate">
                  {themeOption.description}
                </div>
              </div>
              {theme === themeOption.name && (
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 ml-2" />
              )}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}