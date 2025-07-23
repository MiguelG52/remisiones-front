'use client'
import { Badge } from "@/components/ui/badge";
import { OrderDto } from "@/schemas/dto/CreateOrderResponseDto";
import { ColumnDef, Row } from "@tanstack/react-table";
import { File, Edit, Eye } from "lucide-react";

const ActionsColumn = () => {
    return( 
        <div className="flex  gap-2">
            <Badge variant={"destructive"} className="rounded-full w-8 h-8 cursor-pointer">
                <File className="h-5 w-5"></File>
            </Badge>
            <Badge variant="outline" className="rounded-full w-8 h-8 cursor-pointer">
                <Edit></Edit>
            </Badge>
            <Badge variant="outline" className="rounded-full w-8 h-8 cursor-pointer">
                <Eye></Eye>
            </Badge>
            
        </div> 
    )   
}

const DataColumn = ({data}:{data:Row<OrderDto>})=> {
    const formattedDate = new Date(data.original.createdAt).toLocaleDateString("es-mx",{})
    return( 
        <div>
            {formattedDate}
        </div>
    ) 
}
const IsBillableColumn = ({data}:{data:Row<OrderDto>})=> {
    const isBillable = data.original.detail.is_billable
    if(!isBillable) return
    return( 
        <div>
            <Badge variant="outline" className="py-1 rounded-xl w-full border-1">
                Facturable
            </Badge>
        </div>
    ) 
}

const OrderStatusColumn = ({data}:{data:Row<OrderDto>})=> {
    const statusName = data.original.status.name
    if(statusName.toLocaleLowerCase()=="liquidada") return<Badge className="py-1 rounded-xl w-full border-1 text-white  bg-green-700/70">{statusName}</Badge>
    if(statusName.toLocaleLowerCase()=="abonada") return<Badge className="py-1 rounded-xl w-full border-1  bg-amber-500/70">{statusName}</Badge>
    if(statusName.toLocaleLowerCase()=="cerrada") return<Badge className="py-1 rounded-xl w-full border-1  bg-red-500/70">{statusName}</Badge>
}

export const orderTableColums:ColumnDef<OrderDto>[] = [
    {
        accessorKey:'id',
        header: 'Consecutivo',
        enableGlobalFilter: true,
    },
    {
        accessorKey:'clientName',
        header:'Cliente',
        enableGlobalFilter: true,
    },
    {
        id:"Fecha",
        accessorKey:'createdAt',
        header:'Fecha',
        cell:({row})=><DataColumn data={row}/>,
        enableGlobalFilter: true,
    },
    {
        accessorKey:'orderType.name',
        header:'Tipo',
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
                <ActionsColumn/>
            )
        }
    }
]