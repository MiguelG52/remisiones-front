import LoginForm from '@/components/common/forms/LoginForm/LoginForm'
import Link from 'next/link'
import React from 'react'

const Login = () => {
  return (
    <div>
      <div className='p-5 md:pt-10  '>
        <div className='flex flex-col items-center mt-15'>
            <h2 className='font-semibold text-xl md:text-2xl'>Bienvenido</h2>
            <p className='text-sm text-neutral-800/40'>Usa tu correo para iniciar sesión</p>
        </div>
        <div className=' flex justify-center flex-col items-center gap-3'>
          <LoginForm/>
          <Link href="/auth/recover-password"  className='text-pretty text-primary text-sm'>
            ¿olvidasté tu contraseña?
          </Link> 
        </div>
      </div>
    </div>
  )
}

export default Login