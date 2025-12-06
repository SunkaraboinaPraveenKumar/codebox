import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center mb-8">
        <Image
          src="/logo.png"
          alt="Codebox Logo"
          width={60}
          height={60}
          className="mb-4"
        />
        <h1 className="text-4xl font-game text-white">Codebox</h1>
      </div>
      <SignIn 
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-zinc-800 border-4 border-zinc-700",
          }
        }}
      />
    </div>
  )
}
