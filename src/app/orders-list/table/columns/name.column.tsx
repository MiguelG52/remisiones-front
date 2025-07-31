import { Row } from "@tanstack/react-table";
import { OrderDto } from "@/schemas/response/CreateOrderResponseDto";

export const NameColumn = ({ data }: { data: Row<OrderDto> }) => {
  const fullName = `${data.original.buyer.name} ${data.original.buyer.lastname}`;
  return <div className="w-40 truncate">{fullName}</div>;
};
