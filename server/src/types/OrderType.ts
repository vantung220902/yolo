import { ProductOrder } from '../entities/ProductOrder';
import { Order } from '../entities/Order';
import { FieldError } from './FieldError';
import ResponseField from "./ResponseField";

export interface OrderInputType {
    quantity: string;
    productId: string;
    secretUser: string;
    note: string,
    deliveryData: string
}
export class ResponseOrder implements ResponseField {
    code: number;
    success: boolean;
    message?: string | undefined;
    productOrder?: ProductOrder;
    order?: Order;
    error?: FieldError[];
}