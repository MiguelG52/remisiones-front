'use server'
import { ApiError } from "@/schemas/error/error";
import { LoginResponse } from "@/schemas/response/LoginResponse";
import { cookies } from "next/headers";
import { UserDataDto } from "../dto/UserData.dto";
import { redirect } from "next/navigation";
import { RecoverPasswordResponse } from "@/schemas/response/RecoverPasswordRespponse";


export const handleLogin = async(email:string, password:string):Promise<{ success: true, data: UserDataDto } | { success: false, error: ApiError }>=>{
    try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_SERVER}/auth/sign-in`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
    
            const data:LoginResponse = await response.json()
            if (!response.ok) {
                 return {
                    success:false, error: data as ApiError
                 }
            }
            //guardar token en cookie de servidor
            const token:string = data.accessToken
            const serverCookie = await cookies()
            serverCookie.set('authToken', token, {
                httpOnly: true,
                secure: true,
                path: '/',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24*3, // 3 días
            });

            //obtener datos del usuario
            const userReponse = await fetch(`${process.env.NEXT_PUBLIC_URL_SERVER}/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }, 
            })
            const userData:UserDataDto = await userReponse.json()
            if (!response.ok) {
                 return {
                    success:false, error: data as ApiError
                 }
            }
            return { success:true, data: userData}
        } catch (error) {
            console.error('Login error:', error)
            throw error
        }  
}

export async function verifySessionPath(path?:string) {
    const cookieStore = await cookies()
    const token = cookieStore.get('authToken')?.value
    if (!token) {
        redirect('/auth') 
    }
    else{
        if(path) redirect(`${path}`)
    }
}

export  async function getAuthToken() {
    const cookieStore = await cookies()
    return cookieStore.get('authToken')?.value
}

export async function handleLogOut(){
    const cookieStore = await cookies()
    cookieStore.delete('authToken')
    redirect('/auth')
}

export const handleRecoverPassword = async(email:string):Promise<{ success: true, message:string } | { success: false, error: ApiError }>=>{
    try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_SERVER}/auth/request-password-reset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })
    
            const data:RecoverPasswordResponse = await response.json()
            if (!response.ok) {
                 return {
                    success:false, error: data as ApiError
                 }
            }
            return { success:true, message: data.message}
        } catch (error) {
            console.error('Login error:', error)
            throw error
        }  
}