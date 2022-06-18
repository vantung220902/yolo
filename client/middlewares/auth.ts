import { REGISTER, LOGOUT } from './../constants/auth';
import { IAction } from './../types/actionType';
import { loginAPi, registerAPi, logoutApi } from './../api/authApi';
import { LoginInput, ResponseAuth, RegisterInput } from './../../server/src/types/AuthType';
import { LOGIN } from "../constants/auth";
import { authSuccess, error, logoutSuccess } from '../actions/auth';
import { put, call, takeLatest } from 'redux-saga/effects';
import { ResponseGenerator } from '../types/responseType';

function* signIn(action: IAction) {
    const payload: LoginInput = action.payload;
    try {
        const response: ResponseGenerator = yield call(loginAPi, payload);
        const data = <ResponseAuth>response.data;
        if (data.success) {
            yield put(authSuccess(data))
        }
        else yield put(error(data.error));
    } catch (e) {
        console.log(e)
    }
}

function* register(action: IAction) {
    const payload: RegisterInput = action.payload;
    try {
        const response: ResponseGenerator = yield call(registerAPi, payload);
        const data = <ResponseAuth>response.data;
        const { status } = response;
        if (status === 200) {
            if (data.success) yield put(authSuccess(data))
            else yield put(error(data.error));
        }
    } catch (e) {
        console.log(e)
    }
}
function* logout() {
    try {
        const response: ResponseGenerator = yield call(logoutApi);
        const data = <ResponseAuth>response.data;

        const { status } = response;
        if (status === 200) {
            if (data.success) yield put(logoutSuccess())
            else yield put(error(data.error));
        }
    } catch (e) {
        console.log(e)
    }
}
export const authSaga = [
    takeLatest(REGISTER, register),
    takeLatest(LOGOUT, logout),
    takeLatest(LOGIN, signIn),
]