import common, { ICommonReducer } from './commonRedux/reducers';
import { combineReducers } from "redux";
import auth, { IAuthReducer } from './authRedux/reducer'
import product, { IProductReducer } from "./productRedux/reducer";

export interface IRootReducers {
    auth: IAuthReducer,
    product: IProductReducer,
    common: ICommonReducer,
}

const rootReducers = combineReducers<IRootReducers>({
    auth,
    product,
    common,
});

export default rootReducers;