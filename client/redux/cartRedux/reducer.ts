import { addOrderAsync } from './action';
import { createReducer } from 'typesafe-actions';
import { IOrder } from "./type";

export interface ICartReducer {
    order: IOrder
}
const init: ICartReducer = {
    order: {
        id: -1,
        deliveryDate: '',
        note: '',
        products: [],
        secret: '',
        total: 0,
        user: undefined,

    }
}
export default createReducer(init)
    .handleAction(addOrderAsync.request, (state: ICartReducer) => ({
        ...state,
    }))
    .handleAction(addOrderAsync.success, (state: ICartReducer, action: ReturnType<typeof addOrderAsync.success>) => ({
        ...state,
        order: {

        }
    }))