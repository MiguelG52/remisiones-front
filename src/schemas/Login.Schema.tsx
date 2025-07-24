import z from 'zod'

export const LoginFormSchema = z.object({
    email: z.email({error:"Correo inválido"}).nonempty({error:"El correo es requerido"}),
    password:z.string().nonempty({error:"La contraseña es requerida"})
})

export type LoginFormData = z.infer<typeof LoginFormSchema>


