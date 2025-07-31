import { ClientReportPDF } from '@/components/common/pdf/ClientOrdersPDF';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer'
import { BuyerDto } from '../schema/dto/ClientDto';
import { ClientDataReportResponse } from '@/schemas/response/FindClientReportDto';


export async function downloadClientReportPDF(clientData:BuyerDto, reportData: ClientDataReportResponse) {

  // Genera el documento PDF en memoria
  const blob = await pdf(<ClientReportPDF client={clientData} report={reportData}></ClientReportPDF>).toBlob();
  const formattedDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, '-');
  // Crea un enlace para descargar
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `estado_cuenta_${clientData.name}_${clientData.lastname}_${formattedDate}.pdf`;
  a.click();

  // Limpia el objeto URL
  URL.revokeObjectURL(url);
}


export function downloadClientReportCSV(clientName: string, data: ClientDataReportResponse) {
  const formatCurrency = (amount: number) => `$${amount}`;
  const formatDate = (date: Date) => new Date(date).toLocaleDateString();

  const rows: string[][] = [];

  // Encabezado de cargos
  rows.push(['Fecha', 'Remision', 'Concepto', 'Cantidad', 'Subtotal', 'IVA', 'Total']);

  // Para total global de órdenes
  let totalCompras = 0;

  data.orders.forEach(order => {
    const date = formatDate(order.createdAt);
    const remision = `#${order.id}`;

    const totalProducts = order.products.reduce((acc, p) => acc + p.quantity, 0);

    const subtotalTotal = order.subtotal;
    const ivaTotal = order.total - order.subtotal;
    const totalTotal = order.total;

    totalCompras += totalTotal;

    order.products.forEach(product => {
      const proportion = product.quantity / totalProducts;
      const productSubtotal = subtotalTotal * proportion;
      const productIva = ivaTotal * proportion;
      const productTotal = totalTotal * proportion;

      rows.push([
        date,
        remision,
        product.name,
        product.quantity.toString(),
        formatCurrency(productSubtotal),
        formatCurrency(productIva),
        formatCurrency(productTotal),
      ]);
    });
  });

  // Línea vacía
  rows.push([]);

  // Encabezado de abonos
  rows.push(['Fecha', 'tipo', 'Monto']);

  // Total de abonos
  const totalAbonos = data.clientPayments.reduce((sum, p) => Number(sum) + ((Number(p.amount)) ?? 0), 0);

  data.clientPayments.forEach(payment => {
    const date = payment.paymentDate ? formatDate(new Date(payment.paymentDate)) : '';
    const amount = payment.amount ?? 0;

    rows.push([
      date,
      'ABONO',
      formatCurrency(amount),
    ]);
  });

  // Línea vacía
  rows.push([]);

  // Totales
  rows.push(['', '', 'Total de compras', '', '', '', formatCurrency(totalCompras)]);
  rows.push(['', '', 'Total de abonos', '', '', '', formatCurrency(totalAbonos)]);
  rows.push(['', '', 'Saldo pendiente', '', '', '', formatCurrency(totalCompras - totalAbonos)]);

  // Convertir a CSV
  const csvContent = rows.map(row =>
    row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(',')
  ).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${clientName}_estado_cuenta.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}