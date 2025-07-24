import { UserProvider } from '@/context/UserContext'
import { User } from '@/schemas/User.Model'
import { ReactNode } from 'react'

export function Providers({ children, initialUser }: { children: ReactNode, initialUser:User | null }) {
  return (
    <UserProvider initialUser={initialUser}>
      {children}
    </UserProvider>
  )
}