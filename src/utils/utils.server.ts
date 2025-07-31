'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const verifyAuthToken = async()=>{
  const cookieStore = cookies()
    const token = (await cookieStore).get('authToken')?.value
    if (token) {
      redirect('/')
    }
    else {
      redirect('/auth')
    }
}