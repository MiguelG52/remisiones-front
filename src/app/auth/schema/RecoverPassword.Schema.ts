import z from 'zod'

export const RecoverPasswordSchema = z.object({
    email: z.email({error:"Correo inválido"}).nonempty({error:"El correo es requerido"}),
})

export type RecoverPasswordFormData = z.infer<typeof RecoverPasswordSchema>


