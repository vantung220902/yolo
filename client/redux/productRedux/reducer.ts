import { createReducer } from 'typesafe-actions';
import { getProductByIdAsync, loadMoreAsync, resetProduct } from './actions';
import { IProduct } from './type';
export interface IProductReducer {
  totalCount: number;
  cursor: Date;
  hasMore: boolean;
  products: IProduct[];
  product: IProduct | undefined;
  error: FieldError[] | undefined;
  isSearch?: boolean;
}

const init: IProductReducer = {
  totalCount: 0,
  cursor: new Date(),
  hasMore: true,
  products: [],
  product: undefined,
  error: [],
  isSearch: false,
};
export default createReducer(init)
  .handleAction(loadMoreAsync.request, (state: IProductReducer, action: ReturnType<typeof loadMoreAsync.request>) => ({
    ...state,
    isSearch: action.payload.isSearch,
  }))
  .handleAction(loadMoreAsync.success, (state: IProductReducer, action: ReturnType<typeof loadMoreAsync.success>) => {
    return {
      ...state,
      totalCount: action.payload?.totalCount,
      cursor: action.payload?.cursor,
      hasMore: action.payload?.hasMore,
      products:
        state.products.length > 0 && !state.isSearch ? state.products.concat(action.payload?.products as IProduct[]) : action.payload?.products,
    };
  })
  .handleAction(loadMoreAsync.failure, (state: IProductReducer, action: any) => ({
    ...state,
    error: action.payload.error,
  }))

  .handleAction(getProductByIdAsync.request, (state: IProductReducer, action: any) => {
    const { id } = action.payload;
    return {
      ...state,
      product: state.products.find((item) => item.id === id),
    };
  })
  .handleAction(getProductByIdAsync.success, (state: IProductReducer, action: any) => {
    const { product } = action.payload;
    return {
      ...state,
      product,
    };
  })

  .handleAction(resetProduct, (_state: IProductReducer) => ({
    ...init,
  }))

  .handleAction(getProductByIdAsync.failure, (state: IProductReducer, action: any) => ({
    ...state,
    error: action.payload.error,
  }));
