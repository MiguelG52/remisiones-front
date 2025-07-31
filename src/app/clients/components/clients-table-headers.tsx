'use client'
import { ColumnDef} from "@tanstack/react-table";
import { BuyerDto } from "../schema/dto/ClientDto";
import ActionsColumn from "./actions-colum";



export const clientsTableColums:ColumnDef<BuyerDto>[] = [
    {
        accessorKey:'name',
        header:()=><span className="text-center">Nombre</span>,
        cell:({row})=><span className="text-gray-500">{row.original.name} {row.original.lastname} </span>,
        enableGlobalFilter: true,
    },
    {
        accessorKey:'client.email',
        header:'Correo',
        cell:({row})=><span className="text-gray-500">{row.original.client.email} </span>,
        enableGlobalFilter: true,
    },
    {
        accessorKey:'address',
        header:'Dirección',
        cell:({row})=><span className="text-gray-500">{row.original.address} </span>,
        enableGlobalFilter: true,
    },
    {
        accessorKey:'phone',
        header:'Teléfono',
        cell:({row})=><span className="text-gray-500">{row.original.phone} </span>,
        enableGlobalFilter: true,
    },

    {
        id:"actions",
        header:"Acciones",
        cell:({row})=>{
            return( 
                <ActionsColumn data={row.original}/>
            )
        }
    }
]