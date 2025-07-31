import { Row } from "@tanstack/react-table";
import { OrderDto } from "@/schemas/response/CreateOrderResponseDto";
import { Badge } from "@/components/ui/badge";

export const IsBillableColumn = ({ data }: { data: Row<OrderDto> }) => {
  if (!data.original.detail.isBillable) return null;
  return (
    <div>
      <Badge variant="outline" className="py-1 rounded-xl w-full border">
        Facturable
      </Badge>
    </div>
  );
};
