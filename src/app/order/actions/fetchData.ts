import { OrderDto, ResponseCreateOrderDto } from '@/schemas/dto/CreateOrderResponseDto';
import { OrderStatusDto } from '@/schemas/dto/OrderStatusDto';
import { OrderTypeDto } from '@/schemas/dto/OrderTypeDto';
import { OrderData } from '@/schemas/Order.Schema';
import { cache } from 'react'


export const fetchData = cache(async ():Promise<{
    status:Array<OrderStatusDto>,
    types:Array<OrderTypeDto>
}> => {
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4OTIzYmQxMi1lNDI2LTQ2NjctYWU0OS03YzI1NjIzNWYzZGEiLCJlbWFpbCI6Im1pa2lnb256YTUyQGdtYWlsLmNvbSIsInJvbElkIjoiOWRlY2VlN2ItODExZi00Mjg1LTgyYzAtNDM3YWZjNDk3ODlmIiwiaWF0IjoxNzUzMTI0MDUwLCJleHAiOjE3NTMzODMyNTB9.oYbLuZnuKcI6lB_a5hJ0CCSjvw5zWFmzllofDHBqqF4";

  const [statusRes, typesRes] = await Promise.all([
    fetch('http://localhost:5000/order-status/find-all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    }),
    fetch('http://localhost:5000/order-type/find-all', {
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
   const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4OTIzYmQxMi1lNDI2LTQ2NjctYWU0OS03YzI1NjIzNWYzZGEiLCJlbWFpbCI6Im1pa2lnb256YTUyQGdtYWlsLmNvbSIsInJvbElkIjoiOWRlY2VlN2ItODExZi00Mjg1LTgyYzAtNDM3YWZjNDk3ODlmIiwiaWF0IjoxNzUzMTI0MDUwLCJleHAiOjE3NTMzODMyNTB9.oYbLuZnuKcI6lB_a5hJ0CCSjvw5zWFmzllofDHBqqF4";


  try {
    const response = await fetch('http://localhost:5000/orders/create', {
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