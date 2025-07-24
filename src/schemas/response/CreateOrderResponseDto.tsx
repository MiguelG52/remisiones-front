
export interface OrderProduct {
  name: string;
  price: number;
  quantity: number;
}

export interface OrderDetail {
  id: number;
  products: OrderProduct[];
  subtotal: string;
  is_billable: boolean;
  delivery_address: string;
  driver_name: string;
  vehicle_plate: string;
  delivery_date: string | null;
  payment: string;
  iva: string;
  created_at: string;
  updated_at: string;
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

export interface OrderDto {
  id: number;
  clientName: string;
  clientRFC: string;
  createdAt: string;
  user: User;
  status: Status;
  orderType: OrderType;
  detail: OrderDetail;
}

export interface ResponseCreateOrderDto{
    message:string,
    order: OrderDto
}