import { Cart } from './../entities/Cart';
import { FieldError } from './FieldError';
import ResponseField from "./ResponseField";

export interface CartInputType{
    total: number;
    productId: string;
    secretUser: string;
}
export class ResponseCart implements ResponseField {
    code: number;
    success: boolean;
    message?: string | undefined;
    cart?: Cart;
    error?: FieldError[];
}