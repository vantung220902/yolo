import { createReducer } from 'typesafe-actions';
import useToken from '../../hooks/useToken';
import { loginAsync, logoutAsync, registerAsync, getMeAsync } from './actions';
import { IMe } from "./type";

export interface IAuthReducer {
    user?: IMe,
    accessToken?: string,
    error?: FieldError[],
    refreshToken: String

}
const init: IAuthReducer = {
    user: undefined,
    accessToken: '',
    error: [],
    refreshToken: '',
}

export default createReducer(init)
    .handleAction(loginAsync.request, (state: IAuthReducer) => ({
        ...state
    }))
    .handleAction(loginAsync.success, (state: IAuthReducer, action: ReturnType<typeof loginAsync.success>) => {
        useToken.setToken(action.payload.accessToken as string, action.payload.refreshToken as string)
        return {
            ...state,
            user: <IMe>action.payload.user,
            accessToken: action.payload.accessToken as string,
            refreshToken: action.payload.refreshToken as string,
        }
    })
    .handleAction(loginAsync.failure, (state: IAuthReducer, action: ReturnType<typeof loginAsync.failure>) => ({
        ...state,
        error: action.payload
    }))
    .handleAction(registerAsync.request, (state: IAuthReducer) => ({
        ...state
    }))
    .handleAction(registerAsync.success, (state: IAuthReducer, action: ReturnType<typeof registerAsync.success>) => {
        useToken.setToken(action.payload.accessToken as string, action.payload.refreshToken as string)
        return {
            ...state,
            user: <IMe>action.payload.user,
            accessToken: action.payload.accessToken as string,
        }
    })
    .handleAction(registerAsync.failure, (state: IAuthReducer, action: ReturnType<typeof registerAsync.failure>) => ({
        ...state,
        error: action.payload
    }))
    .handleAction(logoutAsync.request, (state: IAuthReducer) => ({
        ...state
    }))
    .handleAction(logoutAsync.success, (state: IAuthReducer) => {
        useToken.deleteToken();
        return {
            ...init
        }
    })
    .handleAction(logoutAsync.failure, (state: IAuthReducer, action: ReturnType<typeof logoutAsync.failure>) => ({
        ...state,
        error: action.payload
    }))
    .handleAction(getMeAsync.request, (state: IAuthReducer) => ({
        ...state,
    }))
    .handleAction(getMeAsync.success, (state: IAuthReducer, action: ReturnType<typeof getMeAsync.success>) => ({
        ...state,
        user: action.payload,
    }))
    .handleAction(getMeAsync.failure, (state: IAuthReducer, action: ReturnType<typeof getMeAsync.failure>) => ({
        ...state,
        error: action.payload
    }))