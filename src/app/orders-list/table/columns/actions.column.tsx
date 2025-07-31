'use client'
import { File, Edit, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CustomTooltip from "@/components/common/CustomTooltip";
import { OrderDto } from "@/schemas/response/CreateOrderResponseDto";
import { downloadOrderPDF } from "@/app/order/actions/createPdf";
import { useUserContext } from "@/context/UserContext";
import { useState } from "react";

export const ActionsColumn = ({ data }: { data: OrderDto }) => {
  const { user } = useUserContext();

  function onDownload() {
    const isCopy = user?.roleId === process.env.NEXT_PUBLIC_SELLER_ROLE;
    downloadOrderPDF(data, isCopy);
  }
  const [open, setOpen] = useState(false)
  const handleSuccess = () => {
      setOpen(false)
    }

  


  return (
    <div className="flex gap-2">
      <CustomTooltip content="Descargar nota de remisión" trigger={
        <Badge onClick={onDownload} variant="destructive" className="rounded-full w-8 h-8 cursor-pointer">
          <File className="h-5 w-5" />
        </Badge>
      } />
      <CustomTooltip content="Cambiar estado de la orden" trigger={
        <Badge onClick={()=>setOpen(!open)} variant="outline" className="rounded-full w-8 h-8 cursor-pointer">
          <Edit/>
        </Badge>
      } />
      <CustomTooltip content="Ver registro" trigger={
        <Badge variant="outline" className="rounded-full w-8 h-8 cursor-pointer">
          <Eye />
        </Badge>
      } />
    </div>
  );
};
