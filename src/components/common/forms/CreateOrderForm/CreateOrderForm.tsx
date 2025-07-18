'use client'
import React, { use, useEffect, useState } from 'react'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { OrderSchema, type OrderData } from '@/schemas/Order.Schema'
import { OrderStatusDto } from '@/schemas/dto/OrderStatusDto'
import { OrderTypeDto } from '@/schemas/dto/OrderTypeDto'
import { Button } from '@/components/ui/button'
import { ClientDataSection } from './client-data-section'
import { OrderDataSection } from './order-data-section'
import { DeliveryDataSection } from './delivery-data-section'
import { ProductsSection } from './product-table-section'
import { type ProductType } from '@/schemas/Product.Schema'
import { Save } from 'lucide-react'

interface CreateOrderFormProps{
  data:Promise<{
    status: Array<OrderStatusDto>;
    types: Array<OrderTypeDto>;
}>
}

const CreateOrderForm = ({data}:CreateOrderFormProps) => {
  
  const dataFetch = use(data)
  const [products, setProducts] = useState<Array<{
  id: number;
  description: string;
  price: number;
  quantity: number;
  }>>([]);
  
  const form = useForm<OrderData>({
    resolver: zodResolver(OrderSchema),
    defaultValues:{
      userId: "8923bd12-e426-4667-ae49-7c256235f3da",
      statusId: "",
      orderTypeId: "",
      clientName: "",
      clientRFC: "",
      detail:{
          subtotal:0,
          isBillable: false,
          products:[],
          driverName:"",
          deliveryAddress:"",
          iva:"",
          deliveryDate: undefined,
      }
    }
  })
  
  useEffect(() => {
    form.setValue("detail.products", products)
  }, [products, form])

  const addProduct = () => {
    const newProduct: ProductType = {
      id: Date.now(),
      description: "",
      price: 0,
      quantity: 1,
    }
    setProducts((prev) => [...prev, newProduct])
  }

  const removeProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const updateProduct = (id: number, key: keyof ProductType, value: string | number) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, [key]: value } : p)))
  }

  // Esta función se ejecuta SOLO si la validación es exitosa
  async function onSubmit(values: OrderData) {
    console.log("✅ ONSUBMIT EJECUTADO - Validación exitosa!")
    console.log("📋 Datos validados:", values)

    try {
      // Simular procesamiento
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("✅ Procesamiento completado")
    } catch (error) {
      console.error("Error en procesamiento:", error)
    }
  }
  /*
  // DEBUGGING: Observar cambios en el estado del formulario
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      console.log(`🔄 Campo cambiado: ${name}, Tipo: ${type}`, value)
    })
    return () => subscription.unsubscribe()
  }, [form])
    */
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 flex flex-col sm:flex-row w-full gap-5">
        {/* Datos básicos */}
        <div className="w-full sm:w-1/2 flex flex-col gap-5">
          <ClientDataSection control={form.control} />

          <OrderDataSection control={form.control} statusData={dataFetch.status} typesData={dataFetch.types} />

          <DeliveryDataSection control={form.control} />
        </div>

        {/* Listado de productos */}
        <div className="w-full sm:w-1/2">
          <ProductsSection
            control={form.control}
            products={products}
            onAddProduct={addProduct}
            onRemoveProduct={removeProduct}
            onUpdateProduct={updateProduct}
          />
          <Button type="submit" className="cursor-pointer mt-2 w-full xl:w-1/3">
            <Save className='text-white'></Save>
            Guardar y Generar PDF
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CreateOrderForm