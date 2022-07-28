import { createAction, createAsyncAction } from 'typesafe-actions';
import {
  ADD_CARTS, CREATE_ORDER, CREATE_ORDER_FAILURE, CREATE_ORDER_SUCCESS, DELETE_CART, GET_CARTS, GET_ORDER, GET_ORDER_FAILURE, GET_ORDER_SUCCESS, UPDATE_CART
} from './constant';
import { ICartLocal, IInputCreateOrder, IOrder } from './type';

export const addOrderAsync = createAsyncAction(
  CREATE_ORDER,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
)<IInputCreateOrder, IResponse & { productIds: string }, FieldError[] | undefined>();

export const getCarts = createAction(GET_CARTS)<void>();

export const addCart = createAction(ADD_CARTS)<ICartLocal>();

export const updateCart = createAction(UPDATE_CART)<{ id: string; value: number }>();

export const deleteCart = createAction(DELETE_CART)<{ id: string }>();

export const getOrderAsync = createAsyncAction(GET_ORDER, GET_ORDER_SUCCESS, GET_ORDER_FAILURE)<
  void,
  IOrder,
  FieldError[] | undefined
>();
