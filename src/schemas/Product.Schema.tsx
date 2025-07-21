import * as z from 'zod'

export const Product = z.object({
  id: z.number().min(1, { message: 'El ID del producto debe ser mayor que 0' }),
  name: z.string().min(1, { message: 'La descripción del producto es obligatoria' }),
  price: z.number().min(0, { message: 'El precio no puede ser negativo' }),
  quantity: z.number().min(1, { message: 'La cantidad mínima es 1' }),
});

export type ProductType = z.infer<typeof Product>