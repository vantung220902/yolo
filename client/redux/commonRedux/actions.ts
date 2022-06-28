import { SHOW_LOADING, HIDDEN_LOADING } from './constant';
import { createAction } from 'typesafe-actions';
export const showLoading = createAction(SHOW_LOADING)<void>()
export const hiddenLoading = createAction(HIDDEN_LOADING)<void>()
