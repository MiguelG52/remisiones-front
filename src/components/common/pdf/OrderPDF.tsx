import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import { OrderDto } from '@/schemas/dto/CreateOrderResponseDto';

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

type orderPdf = OrderDto & {isCopy:boolean}
const OrderPDF = ({id, clientName, clientRFC, createdAt, user, status, orderType, detail, isCopy}:orderPdf) => {



  const getIVATotal = ()=>{
    return parseFloat(detail.iva)*(parseFloat(detail.subtotal)/100)
  }

  const getTotalWithoutIva = ()=>{
    return parseFloat(detail.subtotal)
  }
  const getTotal = ()=>{
    const ivaCost = getIVATotal()
    return parseFloat(detail.subtotal) + ivaCost
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
            <Text style={styles.mark}>{`${isCopy?"Copia":"Original"}`}</Text>
          </View>
        </View>

        {/* Datos del cliente */}
        <Text style={styles.sectionTitle}>Datos del Cliente</Text>
        <Text>Nombre: {clientName}</Text>
        <Text>RFC: {clientRFC}</Text>

        <Text style={styles.sectionTitle}>Datos de la Orden</Text>
        <Text>Vendedor: {user.name} ({user.email})</Text>
        <Text>Tipo de orden: {orderType.name}</Text>
        <Text>Estatus: {status.name}</Text>
        {
          (Number(detail.payment) > 0 && (Number(detail.payment))) ? <Text>Pago anticipado: {detail.payment}</Text>: null
        }    
        
        {/* Entrega */}
        <Text style={styles.sectionTitle}>Datos de Entrega</Text>
        <Text>Dirección: {detail.delivery_address}</Text>
        <Text>Repartidor: {detail.driver_name}</Text>
        <Text>Placas del vehículo: {detail.vehicle_plate}</Text>

        {/* Productos */}
        <Text style={styles.sectionTitle}>Productos</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Producto</Text>
            <Text style={styles.tableColHeader}>Cantidad</Text>
            <Text style={styles.tableColHeader}>Precio</Text>
          </View>
          {detail.products.map((prod, idx) => (
            <View style={styles.tableRow} key={idx}>
              <Text style={styles.tableCol}>{prod.name}</Text>
              <Text style={styles.tableCol}>{prod.quantity}</Text>
              <Text style={styles.tableCol}>${prod.price}</Text>
            </View>
          ))}
        </View>

        {/* Totales */}
        <View style={styles.footer}>

          {
            detail.is_billable ? (
              <>
                <Text>Subtotal: ${detail.subtotal}</Text>
                <Text>IVA: ${getIVATotal()}</Text>
              </>
            ):null
          }
          
          <Text>Total: ${detail.is_billable ? getTotal():getTotalWithoutIva()}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default OrderPDF;