import { call, put, takeLatest } from 'redux-saga/effects';
import { Apis } from './../../services/api';
import { getProductByIdAsync, loadMoreAsync } from './actions';
import { ResponseListProduct, ResponseProduct } from './type';


function* loadMore(api: any, action: any) {
    const limit: number = action.payload.limit;
    const cursor = action.payload.cursor;
    try {
        const response: ResponseGenerator = yield call(api, limit, cursor)
        const data: ResponseListProduct = response.data;
        if (data.success) {
            yield put(loadMoreAsync.success(data))
        } else {
            yield put(loadMoreAsync.failure(data.error))
        }

    } catch (error: any) {
        console.log(error)
        yield put(loadMoreAsync.failure(error))
    }
}

function* getProductById(api: any, action: any) {
    const { id } = action.payload;
    try {
        const response: ResponseGenerator = yield call(api, id)
        const data: ResponseProduct = response.data;
        const { product } = data;
        if (data.success && product) {
            yield put(getProductByIdAsync.success(product))
        } else {
            yield put(getProductByIdAsync.failure(data.error))
        }

    } catch (error: any) {
        console.log(error)
        yield put(getProductByIdAsync.failure(error))
    }
}


export default function productSaga(apiInstance: Apis) {
    return [
        takeLatest(loadMoreAsync.request, loadMore, apiInstance.getProducts),

        takeLatest(getProductByIdAsync.request, getProductById, apiInstance.getProductById)
    ]
}