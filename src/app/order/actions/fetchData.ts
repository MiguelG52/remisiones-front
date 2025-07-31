import { ResponseCreateOrderDto } from '@/schemas/response/CreateOrderResponseDto';
import { OrderStatusDto } from '@/schemas/dto/OrderStatusDto';
import { OrderTypeDto } from '@/schemas/dto/OrderTypeDto';
import { OrderData } from '@/schemas/Order.Schema';
import { cache } from 'react'
import { getAuthToken } from '@/app/auth/actions/auth.actions';
import { BuyerDto } from '@/app/clients/schema/dto/ClientDto';


export const fetchData = cache(async ():Promise<{
    status:Array<OrderStatusDto>,
    types:Array<OrderTypeDto>
    clients:Array<BuyerDto>
}> => {
  const accessToken = await getAuthToken()
  
  const [statusRes, typesRes, clientsRes] = await Promise.all([
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
    }),
    fetch(process.env.NEXT_PUBLIC_URL_SERVER+'/buyers/find-all-clients', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      credentials: 'include'
    })
  ]);

  const [status, types, clients] = await Promise.all([
    statusRes.json(),
    typesRes.json(),
    clientsRes.json()
  ]);

  return { status, types, clients };
});

 export const handleCreateOrder = async(orderData: OrderData): Promise<ResponseCreateOrderDto> => {
  
  try {
    const accessToken = await getAuthToken()
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