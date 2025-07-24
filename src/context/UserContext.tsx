// context/UserContext.tsx
'use client'

import { User } from "@/schemas/User.Model"
import { createContext, ReactNode, useState, useMemo, useCallback, useContext } from "react"

interface IUserContext {
  user: User | null
  updateUser: (newUserData: Partial<User> | null) => void
  isAuth: boolean
}

interface UserProviderProps {
  initialUser?: User | null
  children: ReactNode
}

export const UserContext = createContext<IUserContext>({
  user: null,
  updateUser: () => {},
  isAuth: false
})

export const UserProvider = ({ children, initialUser = null }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(initialUser)
  const [isAuth, setIsAuth] = useState(!!initialUser)

  const updateUser = useCallback((newUserData: Partial<User> | null) => {
    if (newUserData === null) {
      setUser(null)
      setIsAuth(false)
    } else {
      setUser(prev => ({
        ...prev,
        ...newUserData,
      } as User))
      setIsAuth(true)
    }
  }, [])

  const value = useMemo(() => ({
    user,
    updateUser,
    isAuth
  }), [user, updateUser, isAuth])

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext=()=>{
  return useContext(UserContext)
}