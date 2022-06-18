import { FieldError } from "../errorType";
import { IResponse } from "../responseType";

export interface IProduct {
    id: string;
    title: string;
    categoryId: number;
    price: number;
    description: string;
    color: string;
    userId: number;
    image: string;
}


export class ResponseListProduct implements IResponse {
    code!: number;
    success!: boolean;
    message?: string | undefined;
    totalCount!: number;
    cursor?: Date;
    hasMore!: boolean;
    products?: IProduct[];
    error?: FieldError[];

}
export interface IPayloadProductAction {
    limit: number, cursor: Date | undefined
}