'use client'
import React from 'react'
import { SidebarTrigger } from '../ui/sidebar'
import { LogOut } from 'lucide-react'
import { Button } from '../ui/button'
import { handleLogOut } from '@/app/auth/actions/auth.actions'

const Header = () => {
  return (
    <header className='flex justify-between items-center'>
        <SidebarTrigger/>
        <>
          <Button  onClick={()=>handleLogOut()} variant="outline" className='rounded-full cursor-pointer'>
            <LogOut>
            </LogOut>
          </Button>
        </>
    </header>
  )
}

export default Header