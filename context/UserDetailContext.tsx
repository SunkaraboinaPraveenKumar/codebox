"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'

interface UserDetail {
  id: number
  email: string
  name: string | null
  points: number
  subscription: string | null
}

interface UserDetailContextType {
  userDetail: UserDetail | undefined
  setUserDetail: (user: UserDetail | undefined) => void
}

const UserDetailContext = createContext<UserDetailContextType>({
  userDetail: undefined,
  setUserDetail: () => {},
})

export const useUserDetail = () => useContext(UserDetailContext)

export function UserDetailProvider({ children }: { children: ReactNode }) {
  const [userDetail, setUserDetail] = useState<UserDetail | undefined>()
  const { user, isLoaded } = useUser()

  useEffect(() => {
    if (isLoaded && user) {
      fetchUserDetail()
    }
  }, [isLoaded, user])

  const fetchUserDetail = async () => {
    try {
      const response = await axios.post('/api/user')
      setUserDetail(response.data)
    } catch (error) {
      console.error('Error fetching user detail:', error)
    }
  }

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  )
}

export { UserDetailContext }
