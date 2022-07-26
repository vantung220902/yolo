import { call, put, takeLatest } from 'redux-saga/effects';
import { callApi } from '../commonRedux/callApi';
import { toastifyErrorSaga } from '../commonRedux/toastifyFailureRedux';
import { Apis } from './../../services/api';
import { hiddenLoading, showLoading } from './../commonRedux/actions';
import { getProductByIdAsync, loadMoreAsync } from './actions';

function* loadMore(api: any, action: ReturnType<typeof loadMoreAsync.request>) {
  yield put(showLoading());
  yield call(
    callApi as any,
    api,
    {
      asyncAction: loadMoreAsync,
      responseExtractor: (res: any) => res,
      onFailure: toastifyErrorSaga,
    },
    action.payload,
  );
  yield put(hiddenLoading());
}

function* getProductById(api: any, action: any) {
  yield put(showLoading());
  yield call(
    callApi as any,
    api,
    {
      asyncAction: getProductByIdAsync,
      responseExtractor: (res: any) => res,
      onFailure: toastifyErrorSaga,
    },
    action.payload,
  );
  yield put(hiddenLoading());
}

export default function productSaga(apiInstance: Apis) {
  return [
    takeLatest(loadMoreAsync.request, loadMore, apiInstance.getProducts),
    takeLatest(getProductByIdAsync.request, getProductById, apiInstance.getProductById),
  ];
}
