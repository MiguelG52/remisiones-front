import LoginForm from '@/components/common/forms/LoginForm/LoginForm'
import React from 'react'

const Login = () => {
  return (
    <div className='bg-white p-5'>
        <div   className='text-center'>
            <h2 className='font-semibold text-xl md:text-2xl'>Bienvenido</h2>
            <p className='text-sm text-neutral-800/40'>Usa tu correo para iniciar sesión</p>
        </div>
        <LoginForm/>
    </div>
  )
}

export default Login