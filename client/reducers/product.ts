import { GET_MORE, GET_PRODUCT_FROM_CATEGORY, LOAD_MORE_SUCCESS } from './../constants/product';
import { IAction } from './../types/actionType';
import { LIMIT_LOAD_PRODUCT } from "../constants";
import { IProductReducer } from "../types/typeReducers";

const init: IProductReducer = {
    totalCount: LIMIT_LOAD_PRODUCT,
    cursor: new Date(),
    hasMore: true,
    products: [],
}
const reducer = (state = init, action: IAction) => {
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
                products: action.payload.products
            }
        case GET_PRODUCT_FROM_CATEGORY:
            return {
                ...state
            }
        default: return state;
    }
}
export default reducer;