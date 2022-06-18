import { errorProduct, loadMoreSuccess } from './../actions/product';
import { ResponseGenerator } from './../types/responseType';
import { getProducts } from './../api/productApi';
import { call, takeLatest, put } from 'redux-saga/effects';
import { GET_MORE, GET_PRODUCT_FROM_CATEGORY } from './../constants/product';
import { ResponseListProduct } from '../types/Product';
import { IAction } from '../types/actionType';
import { getProductFromCategoryApi } from '../api/categoryApi';

function* loadMore(action: IAction) {
    const limit: number = action.payload.limit;
    const cursor = action.payload.cursor;
    try {
        const response: ResponseGenerator = yield call(getProducts, limit, cursor)
        const data: ResponseListProduct = response.data;
        if (data.success) {
            yield put(loadMoreSuccess(data))
        } else {
            yield put(errorProduct(data.error))
        }

    } catch (error) {
        console.log(error)
    }
}

function* getProductFromCategory(action: IAction) {
    const limit: number = action.payload.limit;
    const cursor = action.payload.cursor;
    const id: string = action.payload.id;
    console.log('ID', id);
    try {
        const response: ResponseGenerator = yield call(getProductFromCategoryApi, id, limit, cursor)
        const data: ResponseListProduct = response.data;
        console.log('Response', response);
        if (data.success) {
            yield put(loadMoreSuccess(data))
        } else {
            yield put(errorProduct(data.error))
        }

    } catch (error) {
        console.log(error)
    }
}

export const productSaga = [
    takeLatest(GET_MORE, loadMore),
    takeLatest(GET_PRODUCT_FROM_CATEGORY, getProductFromCategory)

]