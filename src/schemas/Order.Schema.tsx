import * as z from 'zod'
import { Product } from './Product.Schema'

// Detalle de la orden
const OrderDetailSchema = z.object({
  subtotal: z.number().min(0, { error: 'El subtotal no puede ser negativo' }),
  isBillable: z.boolean(),
  products: z.array(Product).min(1,{error:"Se debe ingresar al menos un articulo"}),
    deliveryAddress: z.string().optional(),
    driverName: z.string().optional(),     
    vehiclePlate: z.string().optional(),  
    deliveryDate: z.date().optional(),
    payment: z.number().optional(),  
    iva: z.string().optional()
});

// Orden principal
export const OrderSchema = z.object({
  userId: z.string().uuid({version:'v4', error: 'El ID de usuario debe ser un UUID válido' }),
  statusId: z.string().uuid({version:'v4', error: 'El ID de estado debe ser un UUID válido' }),
  orderTypeId: z.string().min(1, { error: 'El tipo de orden es obligatorio' }),
  clientName: z.string().min(1, { error: 'El nombre del cliente es obligatorio' }),
  clientRFC: z.string().optional(),
  deliveryDate:z.date().optional(),
  detail: OrderDetailSchema
});

export type OrderData = z.infer<typeof OrderSchema>