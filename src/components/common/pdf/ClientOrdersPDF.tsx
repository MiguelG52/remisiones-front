import { BuyerDto } from '@/app/clients/schema/dto/ClientDto'
import { ProductDto } from '@/schemas/dto/ProductDto'
import { ClientDataReportResponse } from '@/schemas/response/FindClientReportDto'
import { formatCurrency } from '@/utils/utils'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 10, flexDirection: 'column' },
  header: { textAlign: 'center', fontSize: 18, marginBottom: 10, fontWeight: 'bold' },
  title: { textAlign: 'center', fontSize: 14, marginBottom: 5, fontWeight: 'bold', marginTop: 10 },
  section: { marginBottom: 10 },
  bold: { fontWeight: 'bold' },
  marginTop: { marginTop: 5 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  tableRow: { flexDirection: 'row' },
  tableColHeader: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
    padding: 4,
  },
  tableColHeaderConcept: {
    width: '45%',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
    padding: 4,
  }
  ,
  TableColMin: {
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
    padding: 4,
    width: '15%',
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: '#ccc',
    padding: 4,
  },
  tableColDate: {
    width: '15%',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: '#ccc',
    padding: 4,
  },
  tableColConcepts: {
    width: '45%',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: '#ccc',
    padding: 4,
  },
  summaryBox: {
    marginTop: 10,
    width: '38%',
    padding: 6,
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  divisor:{
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 5,
  }
})

interface Props {
  client: BuyerDto
  report: ClientDataReportResponse
}

export const ClientReportPDF = ({ client, report }: Props) => {

    const breakdown = [
    ...report.orders.map((order: { createdAt: string | number | Date; id: any; total: any; products: any }) => ({
      date: new Date(order.createdAt).toLocaleDateString(),
      concept: `Remisión #${order.id}`,
      total: order.total,
      payment: null,
      products: order.products, // ← importante para el desglose
    })),
    ...report.clientPayments.map((p) => ({
      date: new Date(p.paymentDate!).toLocaleDateString(),
      concept: 'Pago recibido',
      total: null,
      payment: p.amount!,
    })),
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  console.log('Breakdown:', breakdown)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Cajas y Empaques Areli</Text>
        <Text style={styles.title}>Estado de cuenta</Text>

        <View style={styles.section}>
          <Text style={styles.bold}>Datos del Cliente:</Text>
          <Text>{`${client.name} ${client.lastname}`}</Text>
          <Text>{client.address}</Text>
          <Text>{client.phone}</Text>
          <Text>{client.client.email}</Text>
        </View>

        <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.TableColMin}>Fecha</Text>
              <Text style={styles.tableColHeaderConcept}>Concepto</Text>
              <Text style={styles.tableColHeader}>Total con IVA</Text>
              <Text style={styles.tableColHeader}>Cargo/Abono</Text>
            </View>
            {breakdown.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.tableColDate}>{item.date}</Text>
                <View style={styles.tableColConcepts}>
                  <Text>{item.concept}</Text>

                  {/* Renderizar subtabla si hay productos */}
                  {'products' in item && item.products?.length > 0 && (
                    <View style={{ marginTop: 4 }}>
                      {item.products.map((prod:ProductDto, idx: number) => (
                        <View key={idx} style={{ flexDirection: 'row', gap: 8, justifyContent: 'space-between' }}>

                          <Text style={{ flex: 1, fontSize: 9 }}>{prod.name}</Text>
                          <Text style={{ flex: 1, fontSize: 9 }}>Cant: {prod.quantity}</Text>
                          <Text style={{ flex: 1, fontSize: 9 }}>{formatCurrency(prod.price)}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
                <Text style={styles.tableCol}>{item.total ? formatCurrency(item.total) : ''}</Text>
                <Text style={styles.tableCol}>{item.payment ? formatCurrency(item.payment) : ''}</Text>
              </View>
            ))}
          </View>
          
        <View style={styles.summaryBox}>
            <Text style={styles.bold}>Resumen</Text>
            <Text style={styles.marginTop}>Subtotal: {formatCurrency(report.subtotal)}</Text>
            <Text>IVA: {formatCurrency(report.iva)}</Text>
            <Text>Total: {formatCurrency(report.total)}</Text>
            <View style={styles.divisor}></View>
            <Text>Total Pagado: {formatCurrency(report.totalPayment)}</Text>
            <Text>Pendiente: {formatCurrency(report.total - report.totalPayment)}</Text>
          </View>
      </Page>
    </Document>
  )
}