import { ResponseCreateOrderDto } from '@/schemas/response/CreateOrderResponseDto';
import { OrderStatusDto } from '@/schemas/dto/OrderStatusDto';
import { OrderTypeDto } from '@/schemas/dto/OrderTypeDto';
import { OrderData } from '@/schemas/Order.Schema';
import { cache } from 'react'
import { getAuthToken } from '@/app/auth/actions/auth.actions';


export const fetchData = cache(async ():Promise<{
    status:Array<OrderStatusDto>,
    types:Array<OrderTypeDto>
}> => {
  const accessToken = getAuthToken()
  
  const [statusRes, typesRes] = await Promise.all([
    fetch(process.env.NEXT_PUBLIC_URL_SERVER+'/order-status/find-all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    }),
    fetch(process.env.NEXT_PUBLIC_URL_SERVER+'/order-type/find-all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      credentials: 'include'
    })
  ]);

  const [status, types] = await Promise.all([
    statusRes.json(),
    typesRes.json()
  ]);

  return { status, types };
});

 export const handleCreateOrder = async(orderData: OrderData): Promise<ResponseCreateOrderDto> => {
   const accessToken = getAuthToken()

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_URL_SERVER+'/orders/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
    }

    const data: ResponseCreateOrderDto = await response.json();
    return data;

  } catch (error: any) {
    throw new Error(error.message || "Hubo un problema con la petición Fetch");
  }
}