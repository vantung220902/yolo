import { Product } from './../entities/Product';
import { FieldError } from "./FieldError";
import ResponseField from "./ResponseField";

export interface ProductInput {
    title: string;
    categoryId: number;
    price: number;
    description: string;
    color: string;
}
export class ResponseProduct implements ResponseField {
    code: number;
    success: boolean;
    message?: string | undefined;
    product?: Product;
    error?: FieldError[];
}
export class ResponseListProduct implements ResponseField {
    code: number;
    success: boolean;
    message?: string | undefined;
    totalCount: number;
    cursor: Date;
    hasMore: boolean;
    products?: Product[];
    error?: FieldError[];
}