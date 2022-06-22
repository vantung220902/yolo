import { FieldError } from './../../server/src/types/FieldError';
import { IPayloadProductAction, ResponseListProduct, IProduct } from './../types/Product/index';
import {
    GET_MORE, LOAD_MORE_SUCCESS, ERROR_PRODUCT, GET_PRODUCT_FROM_CATEGORY, GET_PRODUCT_FROM_COLOR, GET_PRODUCT_BY_ID,
    GET_PRODUCT_BY_ID_SUCCESS
} from './../constants/product';
import { IAction } from './../types/actionType';
export const loadMore = (payload: IPayloadProductAction): IAction => {
    return {
        type: GET_MORE,
        payload
    }
}
export const loadMoreSuccess = (payload: ResponseListProduct): IAction => {
    return {
        type: LOAD_MORE_SUCCESS,
        payload,
    }
}

export const getProductFromCategory = (payload: IPayloadProductAction & { id: number }): IAction => {
    return {
        type: GET_PRODUCT_FROM_CATEGORY,
        payload,
    }
}
export const getProductFromColor = (payload: IPayloadProductAction & { color: string }): IAction => {
    return {
        type: GET_PRODUCT_FROM_COLOR,
        payload,
    }
}
export const errorProduct = (payload: FieldError[] | undefined) => {
    return {
        type: ERROR_PRODUCT,
        payload,
    }
}

export const getProductById = (payload:number): IAction => {
    return {
        type: GET_PRODUCT_BY_ID,
        payload,
    }
}
export const getProductByIdSuccess = (payload: IProduct): IAction => {
    return {
        type: GET_PRODUCT_BY_ID_SUCCESS,
        payload,
    }
}