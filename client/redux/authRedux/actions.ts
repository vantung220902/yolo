import { SIGN_IN, SIGN_UP_SUCCESS, SIGN_IN_FAILURE, SIGN_UP, LOGOUT, SIGN_IN_SUCCESS, SIGN_UP_FAILURE, LOGOUT_SUCCESS, LOGOUT_SUCCESS_FAILURE } from './constant';

import { createAsyncAction } from 'typesafe-actions';
import { LoginInput, ResponseAuth, RegisterInput } from './type';

export const loginAsync = createAsyncAction(SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAILURE)
    <LoginInput, ResponseAuth, FieldError[] | undefined>()

export const registerAsync = createAsyncAction(SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAILURE)
    <RegisterInput, ResponseAuth, FieldError[] | undefined>()

export const logoutAsync = createAsyncAction(LOGOUT, LOGOUT_SUCCESS, LOGOUT_SUCCESS_FAILURE)
    <void, void, FieldError[] | undefined>()


