import { BuyerDto } from "@/app/clients/schema/dto/ClientDto";

export interface OrderProduct {
  name: string;
  price: number;
  quantity: number;
}

export interface OrderDetail {
  id: number;
  products: OrderProduct[];
  subtotal: number;
  isBillable: boolean;
  driverName:string;
  vehiclePlate: string;
  iva: number;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Status {
  id: string;
  name: string;
}

export interface OrderType {
  id: string;
  name: string;
}
export interface Payment {
  id: string;
  amount?:number;
}

export interface OrderDto {
  id: number;
  buyer:Partial<BuyerDto>;
  orderType: Partial<OrderType>;
  status: Partial<Status>;
  user: User;
  createdAt: Date;
  detail: Partial<OrderDetail>;
  payment?:Partial<Payment>;
  total:number,
}

export interface ResponseCreateOrderDto{
    message:string,
    order: OrderDto
}