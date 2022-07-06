import { ProductOrder } from '../entities/ProductOrder';
import { Order } from '../entities/Order';
import { FieldError } from './FieldError';
import ResponseField from "./ResponseField";

export interface OrderInputType {
    quantity: string;
    productId: string;
    secret: string;
    note: string;
    deliveryDate: string;
    address: string;
}
export class ResponseOrder implements ResponseField {
    code: number;
    success: boolean;
    message?: string | undefined;
    productOrder?: ProductOrder;
    order?: Order;
    error?: FieldError[];
}
