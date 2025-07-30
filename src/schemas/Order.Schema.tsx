import z from 'zod'
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
    payment: z.number().min(0,{error:"El pago abonado no debe ser  menor a uno"}).optional(),  
    iva: z.number({error:"El valor ingresado no es numero"})
    .min(0,{error:"El valor  debe se mayor a 0"}).optional(),
});

// Orden principal
export const OrderSchema = z.object({
  userId: z.uuid({version:'v4', error: 'El ID de usuario debe ser un UUID válido' }),
  statusId: z.uuid({version:'v4', error: 'El ID de estado debe ser un UUID válido' }),
  orderTypeId: z.uuid({version:'v4', error: 'El tipo de orden es obligatorio' }),
  clientId:z.string().optional(),
  buyerName:z.string().optional(),
  buyerLastname:z.string().optional(),
  detail: OrderDetailSchema
});

export type OrderData = z.infer<typeof OrderSchema>