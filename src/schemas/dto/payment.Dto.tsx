export interface PaymentDto{
    id:string
    buyerId?: string;
    clientId?: string;
    orderId?: number;
    amount: number;
    paymentDate:Date;

}