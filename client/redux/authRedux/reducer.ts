import { loginAsync, registerAsync, logoutAsync } from './actions';
import { IMe } from "./type"
import useToken from '../../hooks/useToken';
import { createReducer } from 'typesafe-actions';
import appConfig from '../../config'

const { ACCESS_TOKEN, REFRESH_TOKEN } = appConfig;
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
    .handleAction(loginAsync.success, (state: IAuthReducer, action: any) => {

        localStorage.setItem('ACCESS_TOKEN', action.payload.accessToken)
        localStorage.setItem('REFRESH_TOKEN', action.payload.refreshToken)
        console.log('ZO', action.payload)
        return {
            ...state,
            user: <IMe>action.payload.user,
            accessToken: action.payload.accessToken as string,
            refreshToken: action.payload.refreshToken as string,

        }
    })
    .handleAction(loginAsync.failure, (state: IAuthReducer, action: any) => ({
        ...state,
        error: action.payload
    }))
    .handleAction(registerAsync.request, (state: IAuthReducer) => ({
        ...state
    }))
    .handleAction(registerAsync.success, (state: IAuthReducer, action: any) => {
        useToken.setToken(action.payload.accessToken as string, action.payload.refreshToken as string)
        return {
            ...state,
            user: <IMe>action.payload.user,
            accessToken: action.payload.accessToken as string,
        }
    })
    .handleAction(registerAsync.failure, (state: IAuthReducer, action: any) => ({
        ...state,
        error: action.payload
    }))
    .handleAction(logoutAsync.request, (state: IAuthReducer) => ({
        ...state
    }))
    .handleAction(logoutAsync.success, (state: IAuthReducer, action: any) => {
        useToken.deleteToken();
        return {
            ...init
        }
    })
    .handleAction(logoutAsync.failure, (state: IAuthReducer, action: any) => ({
        ...state,
        error: action.payload
    }))

