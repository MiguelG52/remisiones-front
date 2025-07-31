import { ProductDto } from "./ProductDto";

export interface OrderReport{
    createdAt: Date;
    id: number;
    products: ProductDto[];
    subtotal: number;
    total: number;
}