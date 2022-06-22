import { GET_MORE, GET_PRODUCT_FROM_CATEGORY, LOAD_MORE_SUCCESS, GET_PRODUCT_FROM_COLOR, GET_PRODUCT_BY_ID, GET_PRODUCT_BY_ID_SUCCESS } from './../constants/product';
import { IAction } from './../types/actionType';
import { LIMIT_LOAD_PRODUCT } from "../constants";
import { IProductReducer } from "../types/typeReducers";

const init: IProductReducer = {
    totalCount: LIMIT_LOAD_PRODUCT,
    cursor: new Date(),
    hasMore: true,
    products: [],
    product: undefined
}
const reducers = (state = init, action: IAction): IProductReducer => {
    switch (action.type) {
        case GET_MORE:
            return {
                ...state
            }
        case LOAD_MORE_SUCCESS:
            return {
                totalCount: action.payload.totalCount,
                cursor: action.payload.cursor,
                hasMore: action.payload.hasMore,
                products: action.payload.products,
                product: undefined
            }
        case GET_PRODUCT_FROM_CATEGORY:
            const categoryId = action.payload.id;
            return {
                ...state,
                products: state.products.filter(item => item.categoryId === categoryId)

            }
        case GET_PRODUCT_FROM_COLOR:
            const color = action.payload.color;
            return {
                ...state,
                products: state.products.filter(item => item.color === color)
            }
        case GET_PRODUCT_BY_ID:

            return {
                ...state,
            }
        case GET_PRODUCT_BY_ID_SUCCESS:
            return {
                ...state,
                product: action.payload
            }
        default: return state;
    }
}
export default reducers;