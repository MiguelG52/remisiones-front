import { OrderReport } from "../dto/OrderReportDtos";
import { PaymentDto } from "../dto/payment.Dto";

export interface ClientDataReportResponse{
    orders: OrderReport[],
    iva: number,
    total: number,
    subtotal: number,
    totalPayment: number,
    clientPayments:Array<Partial<PaymentDto>>,
}