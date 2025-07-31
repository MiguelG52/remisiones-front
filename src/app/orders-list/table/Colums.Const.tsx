'use client'
import { OrderDto } from "@/schemas/response/CreateOrderResponseDto";
import { ColumnDef } from "@tanstack/react-table";
import { NameColumn } from "./columns/name.column";
import { DateColumn } from "./columns/date.column";
import { IsBillableColumn } from "./columns/isBillable.column";
import { OrderStatusColumn } from "./columns/orderStatus.column";
import { ActionsColumn } from "./columns/actions.column";


export const orderTableColums:ColumnDef<OrderDto>[] = [
    {
        accessorKey:'id',
        header: 'Consecutivo',
        enableGlobalFilter: true,
    },
    {
        accessorKey:'buyer.name',
        header:'Cliente',
        enableGlobalFilter: true,
        cell:({row})=><NameColumn data={row}/>
    },
    {
        id:"Fecha",
        accessorKey:'createdAt',
        header:'Fecha',
        cell:({row})=><DateColumn data={row}/>,
        enableGlobalFilter: true,
    },
    {
        accessorKey:'detail.is_billable',
        header:'Faturable',
        cell:({row})=><IsBillableColumn data={row}/>,
        enableGlobalFilter: true,
    },
    {
        accessorKey:'status.name',
        header:'Estado',
        cell:({row})=><OrderStatusColumn data={row}/>,
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