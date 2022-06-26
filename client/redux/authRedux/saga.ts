
import { registerAsync, loginAsync, logoutAsync } from './actions';
import { put, call, takeLatest } from 'redux-saga/effects';
import { Apis } from '../../services/api';
import { LoginInput, RegisterInput, ResponseAuth } from './type';


function* login(api: any, action: any) {
    const payload: LoginInput = action.payload;
    try {
        const response: ResponseGenerator = yield call(api, payload);
        const data = <ResponseAuth>response.data;
        if (data.success) {
            yield put(loginAsync.success(data))
        }
        else yield put(loginAsync.failure(data.error));
    } catch (e: any) {
        yield put(loginAsync.failure(e))
        console.log(e)
    }
}

function* register(api: any, action: any) {
    const payload: RegisterInput = action.payload;
    try {
        const response: ResponseGenerator = yield call(api, payload);
        const data = <ResponseAuth>response.data;
        if (data.success) yield put(registerAsync.success(data))
        else yield put(registerAsync.failure(data.error));

    } catch (e: any) {
        yield put(registerAsync.failure(e))
        console.log(e)
    }
}
function* logout(api: any) {
    try {
        const response: ResponseGenerator = yield call(api);
        const data = <ResponseAuth>response.data;
        if (data.success) yield put(logoutAsync.success())
        else yield put(logoutAsync.failure(data.error));
    } catch (e: any) {
        console.log(e)
        logoutAsync.failure(e)
    }
}
export default function authSaga(apiInstance: Apis) {
    return [
        takeLatest(registerAsync.request, register, apiInstance.register),
        takeLatest(loginAsync.request, login, apiInstance.login),
        takeLatest(logoutAsync.request, logout, apiInstance.logout),
    ]
}