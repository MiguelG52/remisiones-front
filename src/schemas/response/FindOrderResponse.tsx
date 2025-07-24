import { OrderDto } from "./CreateOrderResponseDto";

export type FindOrderResponse = {
    data?:Array<OrderDto>,
    message?:string,
    total:number, 
    page:number,
    lastPage:number
}