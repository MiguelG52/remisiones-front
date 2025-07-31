import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import { OrderDto } from '@/schemas/response/CreateOrderResponseDto';
// Estilos
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  logoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 50,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  mark:{
    fontWeight:'semibold',
    marginTop: 3,
    fontSize: 10 

  },
  line: {
    borderBottom: '1 solid #000',
    marginVertical: 5,
  },
  table: {
    Display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '33.33%',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#ddd',
    padding: 4,
  },
  tableCol: {
    width: '33.33%',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 4,
  },
  footer: {
    marginTop: 20,
    textAlign: 'right',
  },
});

type OrderPDFProps = OrderDto & { isCopy: boolean }

export const OrderPDF = ({id,createdAt,user,orderType,detail,buyer,total,payment,isCopy,
}: OrderPDFProps) => {
  const formatCurrency = (value: number) =>
    `$${value.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`

  const getTotal = (): number => {
    const subtotal = detail.subtotal ?? 0
    const iva = detail.iva ?? 0
    return detail.isBillable ? Number(subtotal)+Number(iva) : subtotal
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado */}
        <View style={styles.logoSection}>
          <Image style={styles.logo} src="https://via.placeholder.com/150x50?text=LOGO" />
          <View>
            <Text style={styles.heading}>Nota de Remisión</Text>
            <Text>Folio: {id}</Text>
            <Text>Fecha: {new Date(createdAt).toLocaleDateString()}</Text>
            <Text style={styles.mark}>{isCopy ? 'Copia' : 'Original'}</Text>
          </View>
        </View>

        {/* Datos del cliente */}
        <Text style={styles.sectionTitle}>Datos del Cliente</Text>
        <Text>Nombre: {`${buyer.name} ${buyer.lastname ?? ''}`}</Text>
        <Text>Dirección: {buyer.address}</Text>
        {buyer.phone && <Text>Teléfono: {buyer.phone}</Text>}

        {/* Datos de la Orden */}
        <Text style={styles.sectionTitle}>Datos de la Orden</Text>
        <Text>Vendedor: {user.name} ({user.email})</Text>
        {payment?.amount && payment.amount > 0 && (
          <Text>Pago anticipado: {formatCurrency(payment.amount)}</Text>
        )}

        {/* Entrega */}
        <Text style={styles.sectionTitle}>Datos de Entrega</Text>
        {detail.driverName && <Text>Repartidor: {detail.driverName}</Text>}
        {detail.vehiclePlate && <Text>Placas del vehículo: {detail.vehiclePlate}</Text>}

        {/* Productos */}
        <Text style={styles.sectionTitle}>Productos</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Producto</Text>
            <Text style={styles.tableColHeader}>Cantidad</Text>
            <Text style={styles.tableColHeader}>Precio</Text>
          </View>
          {detail.products && detail.products.map((prod, idx) => (
            <View style={styles.tableRow} key={idx}>
              <Text style={styles.tableCol}>{prod.name}</Text>
              <Text style={styles.tableCol}>{prod.quantity}</Text>
              <Text style={styles.tableCol}>{formatCurrency(prod.price)}</Text>
            </View>
          ))}
        </View>

        {/* Totales */}
        <View style={styles.footer}>
          {detail.isBillable && (
            <>
              {detail.subtotal && <Text>Subtotal: {formatCurrency(detail.subtotal)}</Text>}
              {detail.iva && <Text>IVA:{detail.iva}</Text>}
              
            </>
          )}
          <Text>Total: {formatCurrency(getTotal())}</Text>
        </View>
      </Page>
    </Document>
  )
}