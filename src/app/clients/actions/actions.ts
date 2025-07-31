import { ApiError } from "next/dist/server/api-utils"
import { RegisterClientData } from "../schema/RegisterClientSchema"
import { ErrorResponse, ServerGenericResponse } from "@/schemas/response/ServerResponses"
import { getAuthToken } from "@/app/auth/actions/auth.actions"
import { cache } from "react"
import { FindClientsResponse } from "../schema/response/FindClientsResponse"
import { ClientDataReportResponse } from "@/schemas/response/FindClientReportDto"



export const handleRegisterClient = async(formData:RegisterClientData):Promise<ServerGenericResponse<void>>=>{
    const accessToken = await getAuthToken()
    try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_SERVER}/clients/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(formData),
            }) 
    
            const data:{message:string} = await response.json()
            console.log('Response data:', data);
            if (!response.ok) {
                 return {
                    success:false, error: data as ApiError
                 }
            }
            return { success:true, message:data.message}
        } catch (error) {
            console.error('Login error:', error)
            throw error
        }  
}

export const fetchClients = cache(async (page: number = 1, limit: number = 10, search?: string):Promise<FindClientsResponse> => {
  
  const url = new URL(process.env.NEXT_PUBLIC_URL_SERVER+'/buyers/find-clients');
  url.searchParams.append('page', page.toString());
  url.searchParams.append('limit', limit.toString());

  if (search) url.searchParams.append('search', search);
  const accessToken = await getAuthToken()
  const response = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    next: { tags: ['clients'] } // Para revalidación
  });
  const res = await response.json()

  if (!response.ok) {
    console.error('Error al obtener los clientes:', res);
    throw new Error('Error al obtener los clientes');
  }
  
  return res;
});


export const getClientDataReport = cache(
    async (clientId: string):Promise<ServerGenericResponse<ClientDataReportResponse>> => {
      const accessToken = await getAuthToken()
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_SERVER}/clients/find-orders-report/${clientId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return {
            success: false,
            error: data as ApiError,
          };
        }

        return {
          success: true,
          message: "Reporte obtenido correctamente",
          data: data as ClientDataReportResponse, 
        };
      } catch (error) {
        console.error('Error al obtener reporte del cliente:', error);
        throw error;
      }
  }
)