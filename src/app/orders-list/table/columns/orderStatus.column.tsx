import { Row } from "@tanstack/react-table";
import { OrderDto } from "@/schemas/response/CreateOrderResponseDto";
import { Badge } from "@/components/ui/badge";
import { Check, CircleCheck, CircleMinus, CircleX, Cross } from "lucide-react";

export const OrderStatusColumn = ({ data }: { data: Row<OrderDto> }) => {
  const statusName = data.original.status.name?.toLowerCase();
  if (!statusName) return null;

  const baseClass = "py-1 rounded-xl border font-semibold ";
  if (statusName === "liquidada") return <Badge variant="secondary" className={`${baseClass} text-green-800 border-green-300 bg-emerald-100 `}><CircleCheck/>{statusName}</Badge>;
  if (statusName === "abonada") return <Badge className={`${baseClass} text-orange-800 border-orange-300 bg-orange-100`}><CircleMinus/>{statusName}</Badge>;
  if (statusName === "cerrada") return <Badge className={`${baseClass} text-red-800 border-red-300 bg-red-100`}><CircleX/>{statusName}</Badge>;
};
