import z from "zod";


export const RegisterClientSchema = z.object({
    name:z.string().min(3,{error:"El nombre es requerido"}),
    lastname:z.string().min(3,{error:"El apellido es requerido"}),
    address:z.string().min(3,{error:"La dirección es requerida"}),
    email: z
    .union([
      z.email({ message: "El formato no es válido" }),
      z.literal(""),
    ])
    .optional(),
    phone:z.string().optional(),
})

export type RegisterClientData = z.infer<typeof RegisterClientSchema>