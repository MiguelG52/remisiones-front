import { cache } from 'react'
import { OrderStatusDto } from '@/models/dto/OrderStatusDto';
import { OrderTypeDto } from '@/models/dto/OrderTypeDto';

export const fetchData = cache(async ():Promise<{
    status:Array<OrderStatusDto>,
    types:Array<OrderTypeDto>
}> => {
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4OTIzYmQxMi1lNDI2LTQ2NjctYWU0OS03YzI1NjIzNWYzZGEiLCJlbWFpbCI6Im1pa2lnb256YTUyQGdtYWlsLmNvbSIsInJvbElkIjoiOWRlY2VlN2ItODExZi00Mjg1LTgyYzAtNDM3YWZjNDk3ODlmIiwiaWF0IjoxNzUyNzgxNDc4LCJleHAiOjE3NTMwNDA2Nzh9.CJZWpQmWAyLZgRAcgGx9Wudb1IiHlJhgJo2mixhHKDY";

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
      }
    })
  ]);

  const [status, types] = await Promise.all([
    statusRes.json(),
    typesRes.json()
  ]);

  return { status, types };
});