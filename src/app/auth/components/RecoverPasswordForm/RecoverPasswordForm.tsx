'use client'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import InputText from '../../../../components/common/InputText'
import { Loader2, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { handleRecoverPassword, verifySessionPath } from '@/app/auth/actions/auth.actions'
import { RecoverPasswordFormData, RecoverPasswordSchema } from '@/app/auth/schema/RecoverPassword.Schema'

const RecoverPasswordForm = () => {

    const [loading, setIsLoading]= useState<boolean>(false)
    const recoverPasswordForm = useForm<RecoverPasswordFormData>({
      resolver:zodResolver(RecoverPasswordSchema),
      defaultValues:{
        email:"",
      }
    })
  
    async function onSubmit(data:RecoverPasswordFormData) {
        setIsLoading(true)
        try {
            const result = await handleRecoverPassword(data.email);
            if (result.success) {
              toast.success(result.message);
              verifySessionPath('/auth')
            }

        } catch (error) {
            let errorMessage = 'Ocurrió un error al recuperar el correo'
            toast.error(errorMessage)
        } finally {
          setIsLoading(false)
        }
    }
    return (
        <Form {...recoverPasswordForm}>
            <form onSubmit={recoverPasswordForm.handleSubmit(onSubmit)} className='flex flex-col gap-5 mt-5 sm:w-1/2 xl:w-1/4'>
              <InputText 
                control={recoverPasswordForm.control} 
                name='email'
                placeholder='m@ejemplo.com'
                label="Email"
                Icon={Mail}
                type='email'
              />
              <Button className='cursor-pointer'>
                {loading? <Loader2 size={15} className='animate-spin'></Loader2>:"Solicitar Correo"}
                
              </Button>
            </form>
        </Form>
  )
}

export default RecoverPasswordForm