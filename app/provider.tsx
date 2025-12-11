"use client"

import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'
import { UserDetailProvider } from '@/context/UserDetailContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        themes={['dark', 'gaming', 'retro', 'ocean', 'nature', 'sunset']}
        enableSystem={false}
        disableTransitionOnChange={false}
      >
        <UserDetailProvider>
          {children}
          <Toaster />
        </UserDetailProvider>
      </ThemeProvider>
    </ClerkProvider>
  )
}
