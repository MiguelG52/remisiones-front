'use client'

import { useSidebar } from "@/components/ui/sidebar" // Suponiendo que expose el estado del sidebar
import { useUserContext } from "@/context/UserContext" // Suponiendo que tienes este contexto
import UserAvatar from "./UserAvatar"

export function UserSidebarHeader() {
  const { open } = useSidebar()
  const { user } = useUserContext() // Este debería traerte nombre, email, etc.

  return (
    <div className="flex items-center gap-2 overflow-hidden transition-all duration-300">
        {
            user?.name != null && <UserAvatar name={user?.name}></UserAvatar>
        }
      {open && (
        <div className="flex flex-col text-sm font-medium">
          <span>{user?.name}</span>
          <span className="text-xs text-gray-500">{user?.email}</span>
        </div>
      )}
    </div>
  )
}