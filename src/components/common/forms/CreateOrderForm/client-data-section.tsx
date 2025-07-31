import {useFormContext, useWatch, type Control } from "react-hook-form"
import { User, MapPinHouse } from "lucide-react"
import InputText from "../../InputText"
import { OrderData } from "@/schemas/Order.Schema"
import SelectForm from "../../Select"
import { BuyerDto } from "@/app/clients/schema/dto/ClientDto"
import { useEffect } from "react"

interface ClientDataSectionProps {
  control: Control<OrderData>
  clientsData:Array<BuyerDto>
}

export function ClientDataSection({ control, clientsData }: ClientDataSectionProps) {

  const CLIENT_ORDER = process.env.NEXT_PUBLIC_ORDER_TYPE_CLIENTE_ID
  const [orderTypeId, clientId] = useWatch({
    control,
    name: ['orderTypeId', 'clientId'],
  })
  const { setValue } = useFormContext<OrderData>()

  //Cuando se selecciona un cliente, se cargan sus datos en los campos, cuando se quita, se limpian los inputs
  //y se quqita el clientId del formulario
  useEffect(() => {
  const setClientFields = (
    name: string,
    lastname: string,
    address: string,
    clientIdValue: string | undefined
  ) => {
    setValue('buyerName', name)
    setValue('buyerLastname', lastname)
    setValue('detail.deliveryAddress', address)
    setValue('clientId', clientIdValue ?? '')
  }

  if (orderTypeId !== CLIENT_ORDER) {
    setClientFields('', '', '', '')
    return
  }

  const selectedClient = clientsData.find(client => client.id === clientId)
  if (selectedClient) {
    setClientFields(
      selectedClient.name,
      selectedClient.lastname,
      selectedClient.address,
      selectedClient.client.id
    )
  }
}, [clientId, orderTypeId, clientsData, setValue])

  return (
    <div className="p-3 md:p-5 bg-white border rounded-xl">
      <div>
        <div className="flex items-center justify-start gap-2">
          <User className="text-primary" />
          <h3 className="font-semibold">Datos del cliente</h3>
        </div>
        <p className="text-foreground/45 text-sm">Datos básicos del cliente para la orden</p>
      </div>

      <div className="mt-5 flex flex-col items-center gap-5">
        {
          orderTypeId === CLIENT_ORDER 
          ? <>
              <SelectForm
                control={control}
                name="clientId"
                label="Seleccionar Cliente"
                placeholder="Seleccione una opción"
                data={clientsData}
                isRequired={true}
              />
            </>
          :null
        }
        <div className="w-full flex flex-col sm:flex-row gap-5">
          <InputText
          Icon={User}
          control={control}
          name="buyerName"
          label="Nombre del cliente"
          placeholder="ej: Arturo"
          type="text"
          isRequired={true}
          disabled={orderTypeId === CLIENT_ORDER}
        />
        <InputText
          control={control}
          type="text"
          name="buyerLastname"
          label="Apellido"
          placeholder="ej: Herrera"
          disabled={orderTypeId === CLIENT_ORDER}
        />
        </div>
        <InputText
          Icon={MapPinHouse}
          control={control}
          name="detail.deliveryAddress"
          label="Dirección de entrega"
          placeholder="ej: Mario Colin 7"
          disabled={orderTypeId === CLIENT_ORDER}
        />
      </div>
    </div>
  )
}
