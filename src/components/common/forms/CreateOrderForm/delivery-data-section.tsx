import type { Control } from "react-hook-form"
import { Truck, MapPinIcon as MapPinHouse, Car, CircleAlert } from "lucide-react"
import type { OrderData } from "@/schemas/Order.Schema"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import InputText from "../../InputText"
import DatePicker from "../../DatePicker"
interface DeliveryDataSectionProps {
  control: Control<OrderData>
}

export function DeliveryDataSection({ control }: DeliveryDataSectionProps) {
  return (
    <div className="p-3 md:p-5 bg-white border rounded-xl">
      <div>
        <div className="flex items-center justify-start gap-2">
          <Truck className="text-primary" />
          <h3 className="font-semibold">Datos de entrega</h3>
        </div>
      </div>

      <div className="w-full mt-5">
        <Accordion type="single" collapsible className="w-full cursor-pointer">
          <AccordionItem value="item-1">
            <AccordionTrigger className="cursor-pointer gap-2 justify-start items-center p-0 text-[.8rem]">
              Datos de repartidor
              <Badge variant={"outline"} className="rounded-2xl">
                <CircleAlert />
                Opcional
              </Badge>
            </AccordionTrigger>
            <AccordionContent>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 mt-7">
                <InputText
                  Icon={MapPinHouse}
                  control={control}
                  name="detail.deliveryAddress"
                  label="Dirección de entrega"
                  placeholder="ej: Mario Colin 7"
                />
                <InputText
                  Icon={Car}
                  control={control}
                  name="detail.driverName"
                  label="Nombre del conductor"
                  placeholder="ej: Miguel Perez"
                />
                <DatePicker
                  name="detail.deliveryDate"
                  control={control}
                  label="Seleccione la fecha de entrega"
                  placeholder="17/07/2025"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}