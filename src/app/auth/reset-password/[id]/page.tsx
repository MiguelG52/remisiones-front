import ResetPasswordForm from '@/app/auth/components/ResetPasswordForm/resetPasswordForm'
import React from 'react'

const ResetPassword = () => {
  return (
    <div>
      <div className='p-5 md:pt-10  '>
        <div className='flex flex-col items-center mt-15'>
            <h2 className='font-semibold text-xl md:text-2xl'>Recupera tu acceso</h2>
            <p className='text-sm text-neutral-800/40'>Usa tu correo para recibir un correo de restablecimiento</p>
        </div>
        <div className=' flex justify-center flex-col items-center gap-3'>
          <ResetPasswordForm/>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword