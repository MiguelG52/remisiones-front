'use client'
import { Badge } from "@/components/ui/badge";
import { ColumnDef} from "@tanstack/react-table";
import { File, Edit, Sheet } from "lucide-react";
import { BuyerDto } from "../schema/dto/ClientDto";
import CustomTooltip from "@/components/common/CustomTooltip";

const ActionsColumn = () => {
    return( 
        <div className="flex  gap-2">
            <CustomTooltip 
                content="Descargar Estado de cuenta PDF" 
                trigger={
                    <Badge variant={"destructive"} className="rounded-full w-8 h-8 cursor-pointer">
                        <File className="h-5 w-5"></File>
                    </Badge>
                }
            />
            <CustomTooltip 
                content="Descargar Estado de cuenta CSV"
                trigger={
                    <Badge  className="rounded-full w-8 h-8 cursor-pointer bg-green-700">
                        <Sheet className="h-5 w-5"></Sheet>
                    </Badge>   
                }
            />
            <CustomTooltip 
                content="Editar"
                trigger={
                    <Badge variant="outline" className="rounded-full w-8 h-8 cursor-pointer">
                        <Edit></Edit>
                    </Badge> 
                }
            />
        </div> 
    )   
}


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
                <ActionsColumn/>
            )
        }
    }
]