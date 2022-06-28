import { createReducer } from 'typesafe-actions';
import { showLoading, hiddenLoading } from './actions';
export interface ICommonReducer {
    isLoading: boolean,
}

const init: ICommonReducer = {
    isLoading: false
}
export default createReducer(init)
    .handleAction(showLoading, (state: ICommonReducer) => ({
        ...state,
        isLoading: true
    }))
    .handleAction(hiddenLoading, (state: ICommonReducer) => ({
        ...state,
        isLoading: false
    }))