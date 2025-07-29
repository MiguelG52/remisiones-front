export interface BuyerDto{
    id:string,
    name:string,
    lastname:string,
    phone:string,
    address:string,
    client:ClientDto
}


export interface ClientDto  {
    id: string
    email: string
}