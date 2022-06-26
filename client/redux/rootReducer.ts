import { combineReducers } from "redux";
import auth, { IAuthReducer } from './authRedux/reducer'
import product, { IProductReducer } from "./productRedux/reducer";

export interface IRootReducers {
    auth: IAuthReducer,
    product: IProductReducer
}

const rootReducers = combineReducers<IRootReducers>({
    auth,
    product,
    
});

export default rootReducers;