import { FindOrderResponse } from "@/schemas/response/FindOrderResponse";
import { cache } from "react";
import { getAuthToken } from "@/app/auth/actions/auth.actions";
import { changeOrderStatusData } from "@/schemas/ChangeOrderStatus.schema";
import { ErrorResponse, SuccesfullResponse } from "@/schemas/response/ServerResponses";
import { ApiError } from "@/schemas/error/error";

export const fetchOrdersData = cache(async (page: number = 1, limit: number = 10, search?: string): Promise<FindOrderResponse> => {
  
  const url = new URL(process.env.NEXT_PUBLIC_URL_SERVER+'/orders/find-all');
  url.searchParams.append('page', page.toString());
  url.searchParams.append('limit', limit.toString());

  if (search) url.searchParams.append('search', search);
  const accessToken = await getAuthToken()
  const response = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    next: { tags: ['orders'] } // Para revalidación
  });

  if (!response.ok) {
    throw new Error('Error al obtener los pedidos');
  }

  return response.json();
});



export async function getOrdersPaginated(page: number = 1,  search: string = ''): Promise<FindOrderResponse> {
  const accessToken = await getAuthToken()
  const params = new URLSearchParams({
    page: String(page),
    search: search || ''
  })

  const res = await fetch(process.env.NEXT_PUBLIC_URL_SERVER+`/order-status/find-all?${params.toString()}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    cache: 'no-store' 
  })

  if (!res.ok) throw new Error('Error al obtener órdenes')

  const data: FindOrderResponse = await res.json()
  return data
}


export async function handleChangeOrderStatus(id:string, dataStatus:changeOrderStatusData): Promise<SuccesfullResponse | ErrorResponse>{
  const accessToken = await getAuthToken()
  const response = await fetch(process.env.NEXT_PUBLIC_URL_SERVER+`/orders/change-status/${id}`, {
    method:'PATCH',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(dataStatus),
    cache: 'no-store' 
  })
  const data:any = await response.json()

  if (!response.ok) {
      return {
        success:false, error: data as ApiError
      }
  }
  return { success:true, data: data, message:data.message}
}