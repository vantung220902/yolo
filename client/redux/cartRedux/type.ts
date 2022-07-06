import { IProduct } from './../productRedux/type';
import { IMe } from './../authRedux/type';

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
export interface IOrder {
    id: number,
    user?: IMe,
    products: IProduct[],
    total: number,
    deliveryDate: string,
    note: string,
    secret: string,
}
