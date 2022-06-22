import { errorProduct, loadMoreSuccess, getProductByIdSuccess } from './../actions/product';
import { ResponseGenerator } from './../types/responseType';
import { getProductByIdApi, getProductFromColorApi, getProducts } from './../api/productApi';
import { call, takeLatest, put } from 'redux-saga/effects';
import { GET_MORE, GET_PRODUCT_BY_ID, GET_PRODUCT_FROM_CATEGORY, GET_PRODUCT_FROM_COLOR } from './../constants/product';
import { ResponseListProduct, ResponseProduct } from '../types/Product';
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
    try {
        const response: ResponseGenerator = yield call(getProductFromCategoryApi, id, limit, cursor)
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
function* getProductById(action: IAction) {
    const id: string = action.payload;
    try {
        const response: ResponseGenerator = yield call(getProductByIdApi, id)
        const data: ResponseProduct = response.data;
        const { product } = data;
        if (data.success && product) {
            yield put(getProductByIdSuccess(product))
        } else {
            yield put(errorProduct(data.error))
        }

    } catch (error) {
        console.log(error)
    }
}
function* getProductByColor(action: IAction) {
    const limit: number = action.payload.limit;
    const cursor = action.payload.cursor;
    const color: string = action.payload.color;
    try {
        const response: ResponseGenerator = yield call(getProductFromColorApi, color, limit, cursor)
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

export const productSaga = [
    takeLatest(GET_MORE, loadMore),
    takeLatest(GET_PRODUCT_FROM_CATEGORY, getProductFromCategory),
    takeLatest(GET_PRODUCT_FROM_COLOR, getProductByColor),
    takeLatest(GET_PRODUCT_BY_ID, getProductById)


]