import { OrderDto } from '@/schemas/response/CreateOrderResponseDto';
import { pdf } from '@react-pdf/renderer';
import OrderPDF from '@/components/common/pdf/OrderPDF';

export async function downloadOrderPDF(orderData:OrderDto, isCopy:boolean) {

  // Genera el documento PDF en memoria
  const blob = await pdf(<OrderPDF {...orderData} isCopy={isCopy}/>).toBlob();

  // Crea un enlace para descargar
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `nota_remision_${orderData.id}${isCopy ? "_COPIA":""}.pdf`;
  a.click();

  // Limpia el objeto URL
  URL.revokeObjectURL(url);
}
