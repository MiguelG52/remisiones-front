import React from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'

interface UserAvatarProps {
  name: string
}

const UserAvatar = ({ name }: UserAvatarProps) => {
  const initial = name?.charAt(0).toUpperCase() || '?'

  return (
    <div className="bg-primary-foreground rounded-xl">
      <Avatar>
        <AvatarFallback className="bg-neutral-950 text-white font-bold">
          {initial}
        </AvatarFallback>
      </Avatar>
    </div>
  )
}

export default UserAvatar