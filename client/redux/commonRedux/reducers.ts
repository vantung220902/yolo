import { createReducer } from 'typesafe-actions';
import { showLoading, hiddenLoading, showOrderProduct, hiddenModal } from './actions';
export interface ICommonReducer {
    isLoading: boolean,
    content: any,
    isShowModal: boolean,
}

const init: ICommonReducer = {
    isLoading: false,
    content: null,
    isShowModal: false,
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
    .handleAction(showOrderProduct, (state: ICommonReducer, action: any) => {
        return {
            ...state,
            isShowModal: true,
            content: action.payload,
        }
    })
    .handleAction(hiddenModal, (state: ICommonReducer) => ({
        ...state,
        isShowModal: false,
        content: null
    }))