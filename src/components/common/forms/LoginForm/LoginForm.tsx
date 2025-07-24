'use client'
import { Form } from '@/components/ui/form'
import { LoginFormSchema, type LoginFormData } from '@/schemas/Login.Schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import InputText from '../../InputText'
import { Key, Loader2, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { handleLogin, verifySessionPath } from '@/app/auth/actions/auth.actions'
import { useUserContext } from '@/context/UserContext'
import { isApiError } from '@/utils/utils'

const LoginForm = () => {

    const { updateUser } = useUserContext()
    const [loading, setIsLoading]= useState<boolean>(false)
    const loginForm = useForm<LoginFormData>({
      resolver:zodResolver(LoginFormSchema),
      defaultValues:{
        email:"",
        password:"",
      }
    })
  
    async function onSubmit(data: LoginFormData) {
        setIsLoading(true)
        try {
            const result = await handleLogin(data.email, data.password);
            if (isApiError(result)) {
              toast.error(result.message || 'Error desconocido al iniciar sesión');
              return;
            }
            if (result.success) {
              await updateUser(result.data); 
              toast.success('Inicio de sesión exitoso');
              verifySessionPath('/order')
            }

        } catch (error) {
            let errorMessage = 'Ocurrió un error al iniciar sesión'
            toast.error(errorMessage)
        } finally {
          setIsLoading(false)
        }
    }
    return (
        <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onSubmit)} className='flex flex-col gap-5 mt-5 sm:w-1/2 xl:w-1/4'>
              <InputText 
                control={loginForm.control} 
                name='email'
                placeholder='m@ejemplo.com'
                label="Email"
                Icon={Mail}
                type='email'
              />
              <InputText 
                control={loginForm.control} 
                name='password'
                placeholder=''
                label="Contraseña"
                Icon={Key}
                type='password'
              />
              <Button className='cursor-pointer'>
                {loading? <Loader2 size={15} className='animate-spin'></Loader2>:"Iniciar Sesión"}
                
              </Button>
            </form>
        </Form>
  )
}

export default LoginForm