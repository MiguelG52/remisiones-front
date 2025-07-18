import { useWatch, type Control } from "react-hook-form"
import { Box, CreditCard, Percent } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { OrderData } from "@/schemas/Order.Schema"
import { OrderStatusDto } from "@/schemas/dto/OrderStatusDto"
import { OrderTypeDto } from "@/schemas/dto/OrderTypeDto"
import InputText from "../../InputText"
import CheckBoxForm from "../CheckBox"
import Select from "../../Select"


interface OrderDataSectionProps {
  control: Control<OrderData>
  statusData: OrderStatusDto[]
  typesData: OrderTypeDto[]
}

export function OrderDataSection({ control, statusData, typesData }: OrderDataSectionProps) {
  const isBillable = useWatch({
    control,
    name: "detail.isBillable",
  })

  return (
    <div className="p-3 md:p-5 bg-white border rounded-xl">
      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center justify-center gap-2">
            <Box className="text-primary" />
            <h3 className="font-semibold">Datos de la Orden</h3>
          </div>
          {isBillable && (
            <Badge className="rounded-2xl">
              <CreditCard />
              Facturable
            </Badge>
          )}
        </div>
        <p className="text-foreground/45 text-sm">Seleccione el tipo y estatus de la orden</p>
      </div>

      <div className="mt-5 flex items-center flex-col md:flex-row gap-5">
        <Select
          control={control}
          name="statusId"
          label="Estatus"
          placeholder="Seleccione una opción"
          data={statusData}
          isRequired={true}
        />
        <Select
          control={control}
          name="orderTypeId"
          label="Tipo de orden"
          placeholder="Seleccione una opción"
          data={typesData}
          isRequired={true}
        />
      </div>

      <div className="mt-5">
        <Separator />
        <div className={`${isBillable ? "flex flex-col sm:flex-row items-start sm:items-center gap-5" : ""} mt-2`}>
          <CheckBoxForm Icon={CreditCard} name="detail.isBillable" label="¿La nota es facturable?" control={control} />
          {isBillable && (
            <div className="w-full sm:w-1/3">
              <InputText
                Icon={Percent}
                control={control}
                name="detail.iva"
                label="Porcentaje de impuesto"
                placeholder="Número entero ej: 16"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}