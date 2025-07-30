'use client'
import React, { use, useEffect, useState } from 'react'
import { Form } from '@/components/ui/form'
import { useForm, } from 'react-hook-form'
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
import { ResponseCreateOrderDto } from '@/schemas/response/CreateOrderResponseDto'
import { downloadOrderPDF } from '@/app/order/actions/createPdf'
import { toast } from 'sonner'
import { useUserContext } from '@/context/UserContext'
import { BuyerDto } from '@/app/clients/schema/dto/ClientDto'

interface CreateOrderFormProps{
  data:Promise<{
    status: Array<OrderStatusDto>;
    types: Array<OrderTypeDto>;
    clients: Array<BuyerDto>;
}>
}

const CreateOrderForm = ({data}:CreateOrderFormProps) => {
  
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const dataFetch = use(data)
  const [products, setProducts] = useState<Array<ProductType>>([]);
  const {user} = useUserContext()
  console.log(user?.userId)
  const form = useForm<OrderData>({
    resolver:zodResolver(OrderSchema),
    defaultValues: {
      userId: user?.userId,
      statusId: "",
      orderTypeId: "",
      buyerName: "",
      buyerLastname:"",
      clientId:undefined,
      detail: {
        subtotal: 0,
        payment:undefined,
        isBillable: false,
        products: [],
        driverName: '',
        deliveryAddress: '',
        vehiclePlate:'',
        iva:0
      },
    },
  });
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
        toast.success(res.message);
        downloadOrderPDF(res.order, false)
        downloadOrderPDF(res.order, true)
        
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 flex flex-col sm:flex-row w-full gap-5">
        {/* Datos básicos */}
        <div className="w-full sm:w-1/2 flex flex-col gap-5">
          <OrderDataSection  control={form.control} statusData={dataFetch.status} typesData={dataFetch.types}/>
          <ClientDataSection control={form.control} clientsData={dataFetch.clients}/>
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