import z from 'zod'

export const changeOrderStatusSchema = z.object({
    statusId:z.uuidv4({error:"El estatus es requerido"})
})

export type changeOrderStatusData = z.infer<typeof changeOrderStatusSchema>


