import { SHOW_LOADING, HIDDEN_LOADING, SHOW_ORDER_PRODUCT, HIDDEN_MODAL, SHOW_ACTIVE_SEARCH } from './constant';
import { createAction } from 'typesafe-actions';
export const showLoading = createAction(SHOW_LOADING)<void>()
export const hiddenLoading = createAction(HIDDEN_LOADING)<void>()
export const showOrderProduct = createAction(SHOW_ORDER_PRODUCT)<any>()
export const hiddenModal = createAction(HIDDEN_MODAL)<void>()
export const setActiveSearch = createAction(SHOW_ACTIVE_SEARCH)<boolean>()