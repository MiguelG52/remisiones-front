'use client'
import { Badge } from "@/components/ui/badge";
import { File, Edit, Sheet, Loader2 } from "lucide-react";
import CustomTooltip from "@/components/common/CustomTooltip";
import { BuyerDto } from "../schema/dto/ClientDto";
import { getClientDataReport } from "../actions/actions";
import { toast } from "sonner";
import { downloadClientReportCSV, downloadClientReportPDF } from "../actions/reports";
import { useState } from "react";
import { set } from "zod";

interface props{
    data:BuyerDto
}
const ActionsColumn = ({data}:props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingCsv, setLoadingCsv] = useState<boolean>(false);
    
    const handleDownloadPDF = async(clientId:string, clientData:BuyerDto) => {
        setLoading(true);
        const result = await getClientDataReport(clientId);
        if  (!result.success) {
            toast.error(result.error.message || 'Error al descargar el reporte');
        }else{
            result.data && await downloadClientReportPDF(data,result.data)
            toast.success('Reporte descargado exitosamente');
        }
        setLoading(false);

    }

    const handleDownloadCSV = async (clientId: string, clientData: BuyerDto) => {
        setLoadingCsv(true);
        const result = await getClientDataReport(clientId);
        if (!result.success) {
            toast.error(result.error.message || 'Error al descargar el CSV');
        } else {
            try {
                result.data && await downloadClientReportCSV(clientData.name, result.data);
            } catch (error) {
                console.error('Error al generar el CSV:', error);
            }
            toast.success('CSV generado exitosamente');
        }
        setLoadingCsv(false);
    };

    return( 
        <div className="flex  gap-2">
            <CustomTooltip 
                content="Descargar Estado de cuenta PDF" 
                trigger={
                    <Badge onClick={()=>handleDownloadPDF(data.client.id,data)} variant={"destructive"} className="rounded-full w-8 h-8 cursor-pointer">
                        {loading ? <Loader2 className="animate-spin" /> : <File className="h-5 w-5"></File>}
                    </Badge>
                }
            />
            <CustomTooltip 
                content="Descargar Estado de cuenta CSV"
                trigger={
                    <Badge  onClick={()=>handleDownloadCSV(data.client.id,data)} className="rounded-full w-8 h-8 cursor-pointer bg-green-700">
                        {loadingCsv ? <Loader2 className="animate-spin" /> : <Sheet className="h-5 w-5"></Sheet>}
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
export default ActionsColumn;