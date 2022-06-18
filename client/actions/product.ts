import { FieldError } from './../../server/src/types/FieldError';
import { IPayloadProductAction, ResponseListProduct } from './../types/Product/index';
import { GET_MORE, LOAD_MORE_SUCCESS, ERROR_PRODUCT, GET_PRODUCT_FROM_CATEGORY } from './../constants/product';
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
export const errorProduct = (payload: FieldError[] | undefined) => {
    return {
        type: ERROR_PRODUCT,
        payload,
    }
}

