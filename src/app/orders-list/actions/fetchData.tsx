import { FindOrderResponse } from "@/schemas/dto/FindOrderResponse";
import { cache } from "react";


export const fetchOrdersData = cache(async (page: number = 1, limit: number = 10, search?: string): Promise<FindOrderResponse> => {
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4OTIzYmQxMi1lNDI2LTQ2NjctYWU0OS03YzI1NjIzNWYzZGEiLCJlbWFpbCI6Im1pa2lnb256YTUyQGdtYWlsLmNvbSIsInJvbElkIjoiOWRlY2VlN2ItODExZi00Mjg1LTgyYzAtNDM3YWZjNDk3ODlmIiwiaWF0IjoxNzUzMTI0MDUwLCJleHAiOjE3NTMzODMyNTB9.oYbLuZnuKcI6lB_a5hJ0CCSjvw5zWFmzllofDHBqqF4";
  const url = new URL('http://localhost:5000/orders/find-all');
  url.searchParams.append('page', page.toString());
  url.searchParams.append('limit', limit.toString());
  if (search) url.searchParams.append('search', search);

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
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4OTIzYmQxMi1lNDI2LTQ2NjctYWU0OS03YzI1NjIzNWYzZGEiLCJlbWFpbCI6Im1pa2lnb256YTUyQGdtYWlsLmNvbSIsInJvbElkIjoiOWRlY2VlN2ItODExZi00Mjg1LTgyYzAtNDM3YWZjNDk3ODlmIiwiaWF0IjoxNzUzMTI0MDUwLCJleHAiOjE3NTMzODMyNTB9.oYbLuZnuKcI6lB_a5hJ0CCSjvw5zWFmzllofDHBqqF4"

  const params = new URLSearchParams({
    page: String(page),
    search: search || ''
  })

  const res = await fetch(`http://localhost:5000/order-status/find-all?${params.toString()}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    cache: 'no-store' // importante si necesitas fresh data
  })

  if (!res.ok) throw new Error('Error al obtener órdenes')

  const data: FindOrderResponse = await res.json()
  return data
}