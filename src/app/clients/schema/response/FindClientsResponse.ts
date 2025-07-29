import { BuyerDto } from "../dto/ClientDto"

export type FindClientsResponse = {
    data:Array<BuyerDto>,
    message?:string,
    total:number, 
    page:number,
    lastPage:number
}