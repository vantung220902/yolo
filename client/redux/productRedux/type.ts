
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
export class ResponseProduct implements IResponse {
    code!: number;
    success!: boolean;
    message?: string | undefined;
    product?: IProduct;
    error?: FieldError[];
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
    limit: number
    cursor: Date | undefined
    q: string
    isSearch?: boolean | undefined;
}