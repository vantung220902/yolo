import { FieldError } from './../../server/src/types/FieldError';
import { ERROR, REGISTER, LOGOUT, LOGOUT_SUCCESS } from './../constants/auth';
import { IAction } from '../types/actionType';
import { RegisterInput, ResponseAuth } from './../types/Auth/index';
import { LoginInput } from './../../server/src/types/AuthType';
import { LOGIN, AUTH_SUCCESS } from "../constants/auth"

export const login = (payload: LoginInput): IAction => {
    return {
        type: LOGIN,
        payload,
    }
}

export const register = (payload: RegisterInput): IAction => {
    return {
        type: REGISTER,
        payload,
    }
}

export const logout = (payload = null): IAction => {
    return {
        type: LOGOUT,
        payload,
    }
}

export const logoutSuccess = (payload = null): IAction => {
    return {
        type: LOGOUT_SUCCESS,
        payload,
    }
}

export const authSuccess = (payload: ResponseAuth): IAction => {
    return {
        type: AUTH_SUCCESS,
        payload
    }
}

export const error = (payload:FieldError[] | undefined) => {
    return {
        type: ERROR,
        payload,
    }
}

