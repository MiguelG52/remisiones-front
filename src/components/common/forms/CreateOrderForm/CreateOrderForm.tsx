'use client'
import React, { use, useEffect, useState } from 'react'
import { Form } from '@/components/ui/form'
import { useFieldArray, useForm, } from 'react-hook-form'
import { OrderSchema, type OrderData } from '@/schemas/Order.Schema'
import { OrderStatusDto } from '@/schemas/dto/OrderStatusDto'
import { OrderTypeDto } from '@/schemas/dto/OrderTypeDto'
import { Button } from '@/components/ui/button'
import { ClientDataSection } from './client-data-section'
import { OrderDataSection } from './order-data-section'
import { DeliveryDataSection } from './delivery-data-section'
import { ProductsSection } from './product-table-section'
import { type ProductType } from '@/schemas/Product.Schema'
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from 'lucide-react'
import { handleCreateOrder } from '@/app/order/actions/fetchData'
import { ResponseCreateOrderDto } from '@/schemas/dto/CreateOrderResponseDto'
import { downloadOrderPDF } from '@/app/order/actions/createPdf'
import { toast } from 'sonner'

interface CreateOrderFormProps{
  data:Promise<{
    status: Array<OrderStatusDto>;
    types: Array<OrderTypeDto>;
}>
}

const CreateOrderForm = ({data}:CreateOrderFormProps) => {
  
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const dataFetch = use(data)
  const [products, setProducts] = useState<Array<ProductType>>([]);
  
  const form = useForm<OrderData>({
    resolver:zodResolver(OrderSchema),
    defaultValues: {
      userId: "8923bd12-e426-4667-ae49-7c256235f3da",
      statusId: "",
      orderTypeId: "",
      clientName: "",
      clientRFC: '',
      detail: {
        subtotal: 0,
        isBillable: false,
        products: [],
        driverName: '',
        deliveryAddress: '',
        vehiclePlate:''
      },
    },
  });
  const onInvalid = (errors: any) => {
  console.log("❌ Formulario inválido", errors)
}
  //Corregir el efecto de rerenderizado usando useFueldArray
  useEffect(() => {
    form.setValue("detail.products", products)
  }, [products, form])

  const addProduct = () => {
    const newProduct: ProductType = {
      id: Date.now(),
      name: "",
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

  const getSubTotalAmount = () => {
    return products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
  }
  async function onSubmit(values: OrderData) {
      setIsLoading(true);
      try {
        //Casting data
        const totalNumber = Number(getSubTotalAmount())
        values.detail.subtotal = totalNumber
        const res: ResponseCreateOrderDto = await handleCreateOrder(values);
        const order = res.order;
        await downloadOrderPDF(order, false);
        await downloadOrderPDF(order, true);

        toast.success(res.message);
      } catch (error: any) {
        try {
          const errorData = JSON.parse(error.message.split(' - ')[1]);
          if (errorData.message && Array.isArray(errorData.message)) {
            toast.error(errorData.message.join(', '));
          } else {
            toast.error("Error al crear la orden");
          }
        } catch {
          toast.error("Error inesperado");
        }
      }
       finally {
        setIsLoading(false);
      }
    }

    // DEBUGGING: Observar cambios en el estado del formulario
    useEffect(() => {
      const subscription = form.watch((value, { name, type }) => {
        console.log(`🔄 Campo cambiado: ${name}, Tipo: ${type}`, value)
      })
      return () => subscription.unsubscribe()
    }, [form])
    
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit,onInvalid)} className="mt-5 flex flex-col sm:flex-row w-full gap-5">
        {/* Datos básicos */}
        <div className="w-full sm:w-1/2 flex flex-col gap-5">
          <ClientDataSection control={form.control} />

          <OrderDataSection  control={form.control} statusData={dataFetch.status} typesData={dataFetch.types}/>

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
          <Button disabled={isLoading} type="submit" className="cursor-pointer mt-2 w-full xl:w-1/3">
            <Save  className='text-white'></Save>
            {isLoading? <Loader2 size={15} className='animate-spin'></Loader2>:"Guardar y Generar PDF"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CreateOrderForm