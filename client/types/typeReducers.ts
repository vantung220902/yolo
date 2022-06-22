import { IProduct } from './Product/index';
import { FieldError } from './errorType';
import { IMe } from "./Auth";

export interface IAuthReducer {
    user?: IMe ,
    accessToken?: string,
    error?: FieldError[],
    refreshToken:String
    
}

export interface IProductReducer {
    totalCount: number,
    cursor: Date,
    hasMore: boolean,
    products: IProduct[],
    product:IProduct | undefined
}

export interface IRootReducers {
    auth: IAuthReducer,
    product:IProductReducer
}