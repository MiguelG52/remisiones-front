import { Row } from "@tanstack/react-table";
import { OrderDto } from "@/schemas/response/CreateOrderResponseDto";

export const DateColumn = ({ data }: { data: Row<OrderDto> }) => {
  const formattedDate = new Date(data.original.createdAt).toLocaleDateString("es-mx");
  return <div>{formattedDate}</div>;
};
