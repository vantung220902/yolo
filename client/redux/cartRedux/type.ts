import { Product } from './../../../server/src/entities/Product';
export interface ICartLocal {
    productId: string;
    image: string;
    title: string;
    price: number;
    total: number;

}

export interface IOrderRequest {
    userName: string,
    address: string,
    deliveryDate: Date | string,
    productId: string[],
    note: string,
    secret: string,
}

export interface IInputCreateOrder {
    quantity: string;
    productId: string;
    secret: string;
    note: string,
    deliveryDate: string | Date;
    address: string;
}

// type order
export interface IProductOrder {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    secretUser: string;
    deliveryDate: Date;
    note: string;
    address: string;
    products: Product;
  }
  export interface IOrder {
    id: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    productOrder: IProductOrder[];
  }
  export class ResponseListProductOrder implements IResponse {
    code!: number;
    success!: boolean;
    message?: string | undefined;
    error?: FieldError[] | undefined;
    data: IOrder | undefined;
  }