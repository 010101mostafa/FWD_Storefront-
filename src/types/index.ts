import Product from "../models/Product";

export type product = {
    id:number,
    name: string,
    price: number,
    category:string|null
}
export interface products extends product{
    quantity:number
}
export type user = {
    id:number,
    firstName:string,
    lastName:string ,
    password:string
}
enum status{
    active,complete
}
export type order = {
    id:number,
    status:status
    user:user
    Products:products[]
}
