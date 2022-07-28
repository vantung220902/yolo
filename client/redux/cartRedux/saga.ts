import { call, takeLatest } from 'redux-saga/effects';
import { callApi } from 'redux/commonRedux/callApi';
import { toastifyErrorSaga } from 'redux/commonRedux/toastifyFailureRedux';
import { Apis } from './../../services/api';
import { addOrderAsync, getOrderAsync } from './action';
import { ResponseListProductOrder } from './type';

function* addOrder(api: any, action: ReturnType<typeof addOrderAsync.request>) {
  yield call(
    callApi as any,
    api,
    {
      asyncAction: addOrderAsync,
      responseExtractor: (res: any) => ({ ...res, productIds: action.payload.productId }),
      onFailure: toastifyErrorSaga,
    },
    action.payload,
  );
}
function* getOrder(api: any, action: ReturnType<typeof getOrderAsync.request>) {
  yield call(
    callApi as any,
    api,
    {
      asyncAction: getOrderAsync,
      responseExtractor: (res: ResponseListProductOrder) => res.data,
      onFailure: toastifyErrorSaga,
    },
    action.payload,
  );
}

export default function cartSaga(apiInstance: Apis) {
  return [
    takeLatest(addOrderAsync.request, addOrder, apiInstance.addOrder),
    takeLatest(getOrderAsync.request, getOrder, apiInstance.getOrder),
  ];
}
