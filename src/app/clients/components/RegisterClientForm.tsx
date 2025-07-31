'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { RegisterClientData, RegisterClientSchema } from '../schema/RegisterClientSchema'
import { Form } from '@/components/ui/form'
import InputText from '@/components/common/InputText'
import { Button } from '@/components/ui/button'
import { Loader2, Mail, MapPin, Phone, User } from 'lucide-react'
import { toast } from 'sonner'
import { verifySessionPath } from '@/app/auth/actions/auth.actions'
import { handleRegisterClient } from '../actions/actions'

interface props{
  onCloseDialog:()=>void
}

const RegisterClientForm = ({onCloseDialog}:props) => {

    const [loading, setIsLoading]= useState<boolean>(false)
    const loginForm = useForm<RegisterClientData>({
      resolver:zodResolver(RegisterClientSchema),
      defaultValues:{
        name:"",
        lastname:"",
        address:"",
        phone:undefined,
        email:undefined,
      }
    })
  
    async function onSubmit(data: RegisterClientData) {
        setIsLoading(true)
        try {
            const result = await handleRegisterClient(data);
            if (!result.success) {
              toast.error(result.error.message || 'Error desconocido al iniciar sesión');
              return;
            }
            if (result.success) {
              toast.success(result.message);
              onCloseDialog()
              verifySessionPath('/clients')
            }

        } catch (error) {
            toast.error('Ocurrió un error al iniciar sesión')
        } finally {
          setIsLoading(false)
        }
    }
    return (
        <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onSubmit)} className='flex flex-col gap-5 mt-5 w-full'>
              <InputText 
                control={loginForm.control} 
                name='name'
                placeholder='ej: Arturo'
                label="Nombre"
                Icon={User}
                type='text'
                isRequired
              />
              <InputText 
                control={loginForm.control} 
                name='lastname'
                placeholder='ej: Herrera'
                label="Apellido"
                type='text'
                isRequired
              />
              <InputText 
                control={loginForm.control} 
                name='address'
                placeholder='ej: Avenida 21 Marzo, 76, Atizapan'
                label="Direccíon"
                type='text'
                Icon={MapPin}
                isRequired
              />
              <InputText 
                control={loginForm.control} 
                name='email'
                placeholder='ej: a@ejemplo.com'
                label="Correo"
                type='email'
                Icon={Mail}
              />
              <InputText 
                control={loginForm.control} 
                name='phone'
                placeholder='ej: 55123567'
                label="Teléfono"
                type='text'
                Icon={Phone}
              />
              <Button className='cursor-pointer'>
                {loading? <Loader2 size={15} className='animate-spin'></Loader2>:"Registrar"}
              </Button>
            </form>
        </Form>
  )
}

export default RegisterClientForm