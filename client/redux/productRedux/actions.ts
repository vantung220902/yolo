import { createAction, createAsyncAction } from 'typesafe-actions';
import { GET_PRODUCT_BY_ID, GET_PRODUCT_BY_ID_FAILURE, GET_PRODUCT_BY_ID_SUCCESS, LOAD_MORE, LOAD_MORE_FAILURE, LOAD_MORE_SUCCESS, RESET_PRODUCT } from './constant';
import { IPayloadProductAction, IProduct, ResponseListProduct } from './type';

export const loadMoreAsync = createAsyncAction(LOAD_MORE, LOAD_MORE_SUCCESS, LOAD_MORE_FAILURE)
    <IPayloadProductAction, ResponseListProduct | undefined, FieldError[] | undefined>()

export const getProductByIdAsync = createAsyncAction(GET_PRODUCT_BY_ID, GET_PRODUCT_BY_ID_SUCCESS, GET_PRODUCT_BY_ID_FAILURE)
    <{ id: number }, IProduct, FieldError[] | undefined>()

export const resetProduct = createAction(RESET_PRODUCT)<void>()