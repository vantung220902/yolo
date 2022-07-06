import { call, put, takeLatest } from 'redux-saga/effects';
import { hiddenLoading, hiddenModal, showLoading } from '../commonRedux/actions';
import { Apis } from './../../services/api';
import { addOrderAsync } from './action';

function* addOrder(api: any, action: ReturnType<typeof addOrderAsync.request>) {
    yield put(showLoading())
    try {
        const response: ResponseGenerator = yield call(api, action.payload);
        const data: IResponse = response.data;
        console.log(data)
        if (data.success) {
            yield put(addOrderAsync.success({ ...data, productIds: action.payload.productId }))
            yield put(hiddenModal())
        }
    } catch (error: any) {
        console.log(error)
        yield put(addOrderAsync.failure(error))
    }
    yield put(hiddenLoading())
}

export default function cartSaga(apiInstance: Apis) {
    return [
        takeLatest(addOrderAsync.request, addOrder, apiInstance.addOrder),
    ]
}