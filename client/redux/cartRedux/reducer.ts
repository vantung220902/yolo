import { LOCAL_CART } from './../../services/cart';
import { addOrderAsync, getCarts, addCart, updateCart, deleteCart, getOrderAsync } from './action';
import { createReducer } from 'typesafe-actions';
import { ICartLocal, IOrder } from './type';

export interface ICartReducer {
  orders: IOrder[];
  isLoading: false;
  carts: ICartLocal[];
  error: FieldError[] | undefined;
}
const init: ICartReducer = {
  isLoading: false,
  orders: [],
  carts: [],
  error:[]
};
export default createReducer(init)
  .handleAction(addOrderAsync.request, (state: ICartReducer) => ({
    ...state,
  }))
  .handleAction(
    addOrderAsync.success,
    (state: ICartReducer, action: ReturnType<typeof addOrderAsync.success>) => {
      let carts: ICartLocal[] = JSON.parse(localStorage.getItem(LOCAL_CART) as string);
      action.payload.productIds.split(',').forEach((item) => {
        carts = carts.filter((cart) => cart.productId != item);
      });
      localStorage.setItem(LOCAL_CART, JSON.stringify(carts));
      return {
        ...state,
        carts: carts,
      };
    },
  )
  .handleAction(getCarts, (state: ICartReducer) => {
    const data: ICartLocal[] = JSON.parse(localStorage.getItem(LOCAL_CART) as string);
    return {
      ...state,
      carts: data,
    };
  })
  .handleAction(addCart, (state: ICartReducer, action: ReturnType<typeof addCart>) => {
    const listCart: ICartLocal[] = localStorage.getItem(LOCAL_CART)
      ? JSON.parse(localStorage.getItem(LOCAL_CART) as string)
      : [];
    const index = listCart.findIndex((item) => item.productId == action.payload.productId);
    let carts = [];
    if (index !== -1) {
      carts = [
        ...listCart.slice(0, index),
        {
          ...action.payload,
          total: action.payload.total + listCart[index].total,
        },
        ...listCart.slice(index, -1),
      ];
    } else {
      carts = [...listCart, action.payload];
    }
    localStorage.setItem(LOCAL_CART, JSON.stringify(carts));
    return {
      ...state,
      carts,
    };
  })
  .handleAction(updateCart, (state: ICartReducer, action: ReturnType<typeof updateCart>) => {
    const { carts } = state;
    const { id, value } = action.payload;
    const index = carts.findIndex((item) => item.productId == id);
    const newObj = {
      ...carts[index],
      total: (carts[index]?.total as number) + value,
    };
    const array = [...carts.slice(0, index), newObj, ...carts.slice(index, -1)];
    localStorage.setItem(LOCAL_CART, JSON.stringify(array));
    return {
      ...state,
      carts: array,
    };
  })
  .handleAction(deleteCart, (state: ICartReducer, action: ReturnType<typeof deleteCart>) => {
    const array = state.carts.filter((item) => item.productId != action.payload.id);
    localStorage.setItem(LOCAL_CART, JSON.stringify(array));
    return {
      ...state,
      carts: array,
    };
  })
  .handleAction(getOrderAsync.request, (state: ICartReducer) => ({
    ...state,
    isLoading: true,
  }))
  .handleAction(
    getOrderAsync.success,
    (state: ICartReducer, action: ReturnType<typeof getOrderAsync.success>) => ({
      ...state,
      isLoading: false,
      orders: action.payload,
    }),
  )
  .handleAction(
    getOrderAsync.failure,
    (state: ICartReducer, action: ReturnType<typeof getOrderAsync.failure>) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
  );
