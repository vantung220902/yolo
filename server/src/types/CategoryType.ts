import { Product } from './../entities/Product';
import { Category } from './../entities/Category';
import { FieldError } from "./FieldError";
import ResponseField from "./ResponseField";

export interface CategoryInput {
    title: string
}
export class ResponseCategory implements ResponseField {
    code: number;
    success: boolean;
    message?: string | undefined;
    category?: Category;
    categories: Category[];
    error?: FieldError[];
}
export class ResponseProductFromCategory implements ResponseField {
    code: number;
    success: boolean;
    message?: string | undefined;
    products: Product[];
    error?: FieldError[];
}