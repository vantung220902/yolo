import common, { ICommonReducer } from './commonRedux/reducers';
import { combineReducers } from "redux";
import auth, { IAuthReducer } from './authRedux/reducer'
import product, { IProductReducer } from "./productRedux/reducer";
import cart,{ ICartReducer } from './cartRedux/reducer';

export interface IRootReducers {
    auth: IAuthReducer,
    product: IProductReducer,
    common: ICommonReducer,
    cart: ICartReducer
}

const rootReducers = combineReducers<IRootReducers>({
    auth,
    product,
    common,
    cart,
});

export default rootReducers;