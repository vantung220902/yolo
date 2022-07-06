import { CREATE_ORDER, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE, GET_CARTS, ADD_CARTS, UPDATE_CART, DELETE_CART } from './constant';
import { createAction, createAsyncAction } from "typesafe-actions";
import { ICartLocal, IInputCreateOrder } from './type';

export const addOrderAsync = createAsyncAction(CREATE_ORDER, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE)<IInputCreateOrder, IResponse & { productIds: string }, FieldError[] | undefined>();

export const getCarts = createAction(GET_CARTS)<void>()

export const addCart = createAction(ADD_CARTS)<ICartLocal>()

export const updateCart = createAction(UPDATE_CART)<{ id: string, value: number }>()

export const deleteCart = createAction(DELETE_CART)<{ id: string }>()