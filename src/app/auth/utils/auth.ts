import { cookies } from "next/headers"

export const getUserFromToken = async (token:string)=>{

  let initialUser = null
  if (token) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_SERVER}/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.ok) {
      initialUser = await response.json()
      return initialUser
    }
  }
  return null
}
