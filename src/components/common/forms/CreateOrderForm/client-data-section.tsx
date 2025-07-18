import type { Control } from "react-hook-form"
import { User, File } from "lucide-react"
import InputText from "../../InputText"
import {OrderData} from '@/schemas/Order.Schema'

interface ClientDataSectionProps {
  control: Control<OrderData>
}

export function ClientDataSection({ control }: ClientDataSectionProps) {
  return (
    <div className="p-3 md:p-5 bg-white border rounded-xl">
      <div>
        <div className="flex items-center justify-start gap-2">
          <User className="text-primary" />
          <h3 className="font-semibold">Datos del cliente</h3>
        </div>
        <p className="text-foreground/45 text-sm">Datos básicos del cliente para la orden</p>
      </div>

      <div className="mt-5 flex flex-col items-center md:flex-row gap-5">
        <InputText
          Icon={User}
          control={control}
          name="clientName"
          label="Nombre del cliente"
          placeholder="ej: Arturo Herrera"
          isRequired={true}
        />
        <InputText
          Icon={File}
          control={control}
          name="clientRFC"
          label="RFC del cliente"
          placeholder="ej: GOHM091294RF9"
        />
      </div>
    </div>
  )
}
