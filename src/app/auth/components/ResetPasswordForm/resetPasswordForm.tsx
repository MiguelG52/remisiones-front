'use client'
import { handleResetPassword, verifySessionPath } from '@/app/auth/actions/auth.actions'
import { ResetPasswordSchema, type ResetPasswordFormData } from '@/app/auth/schema/ResetPassword.schema'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import InputText from '../../../../components/common/InputText'
import { Button } from '@/components/ui/button'
import { Key, Loader2 } from 'lucide-react'
import { useParams, useSearchParams } from 'next/navigation'

const ResetPasswordForm = () => {

    const queryarams = useSearchParams()
    const email = queryarams.get('email') ?? undefined
    const params = useParams<{id:string}>()

    const [loading, setIsLoading]= useState<boolean>(false)

    const onvalid = (errors:any)=> console.log(errors)
    const resetPasswordForm = useForm<ResetPasswordFormData>({
      resolver:zodResolver(ResetPasswordSchema),
      defaultValues:{
        email,
        token:params.id,
        newPassword:'',
        confirmPassword:'',
      }
    })
  
    async function onSubmit(data:ResetPasswordFormData) {
        setIsLoading(true)
        try {
            const result = await handleResetPassword(data);
            if (!result.success) {
                toast.error(result.error.message || 'Error desconocido al iniciar sesión');
                return;
                        }
            if (result.success) {     
                toast.success(result.message);
                verifySessionPath('/order')
            }

        } catch (error) {
            let errorMessage = 'Ocurrió un error al recuperar el correo'
            toast.error(errorMessage)
        } finally {
          setIsLoading(false)
        }
    }

    console.log(params.id)

  return (
    <Form {...resetPasswordForm}>
            <form onSubmit={resetPasswordForm.handleSubmit(onSubmit, onvalid)} className='flex flex-col gap-5 mt-5 sm:w-1/2 xl:w-1/4'>
              <InputText 
                control={resetPasswordForm.control} 
                name='newPassword'
                placeholder=''
                label="Nueva Contraseña"
                Icon={Key}
                type='password'
              />
              <InputText 
                control={resetPasswordForm.control} 
                name='confirmPassword'
                placeholder=''
                label="Verificar la contraseña"
                Icon={Key}
                type='password'
              />
              
              <Button className='cursor-pointer'>
                {loading? <Loader2 size={15} className='animate-spin'></Loader2>:"Solicitar Correo"}
                
              </Button>
            </form>
        </Form>
  )
}

export default ResetPasswordForm