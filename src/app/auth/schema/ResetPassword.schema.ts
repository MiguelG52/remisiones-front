import z from 'zod'

export const ResetPasswordSchema = z.object({
    email: z.email(),
    newPassword:z.string().min(8,{error:"La contraseña no puede tener menos de 8 caracteres"}),
    confirmPassword:z.string(),
    token:z.string({error:"EL token es invalido"})
})
.refine((data)=> data.newPassword === data.confirmPassword,{
    message:"Las contraseñas no coinciden",
    path:['confirmPassword']
})

export type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>


