import { CREATE_ORDER, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE } from './constant';
import { createAsyncAction } from "typesafe-actions";
import { IInputCreateOrder } from './type';

export const addOrderAsync = createAsyncAction(CREATE_ORDER, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE)<IInputCreateOrder, ResponseType, FieldError[] | undefined>();