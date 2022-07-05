import { SHOW_LOADING, HIDDEN_LOADING, SHOW_ORDER_PRODUCT, HIDDEN_MODAL } from './constant';
import { createAction } from 'typesafe-actions';
export const showLoading = createAction(SHOW_LOADING)<void>()
export const hiddenLoading = createAction(HIDDEN_LOADING)<void>()
export const showOrderProduct = createAction(SHOW_ORDER_PRODUCT)<any>()
export const hiddenModal = createAction(HIDDEN_MODAL)<void>()