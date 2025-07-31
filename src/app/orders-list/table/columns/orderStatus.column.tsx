import { Row } from "@tanstack/react-table";
import { OrderDto } from "@/schemas/response/CreateOrderResponseDto";
import { Badge } from "@/components/ui/badge";

export const OrderStatusColumn = ({ data }: { data: Row<OrderDto> }) => {
  const statusName = data.original.status.name?.toLowerCase();
  if (!statusName) return null;

  const baseClass = "py-1 rounded-xl w-full border";
  if (statusName === "liquidada") return <Badge className={`${baseClass} text-white bg-green-700/70`}>{statusName}</Badge>;
  if (statusName === "abonada") return <Badge className={`${baseClass} bg-amber-500/70`}>{statusName}</Badge>;
  if (statusName === "cerrada") return <Badge className={`${baseClass} bg-red-500/70`}>{statusName}</Badge>;
};
