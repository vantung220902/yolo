import { LOGIN, AUTH_SUCCESS, ERROR, LOGOUT, LOGOUT_SUCCESS } from './../constants/auth';
import { IAction } from "../types/actionType"
import { IMe } from "../types/Auth"
import { IAuthReducer } from '../types/typeReducers';
import useToken from '../utils/useToken';
const init: IAuthReducer = {
    user: undefined,
    accessToken: '',
    error: [],
    refreshToken: '',
}
const reducers = (state = init, action: IAction) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
            }
        case AUTH_SUCCESS:
            useToken.setToken(action.payload.accessToken as string, action.payload.refreshToken as string)
            return {
                ...state,
                user: <IMe>action.payload.user,
                accessToken: action.payload.accessToken as string,
            }
        case LOGOUT:
            return {
                ...state,
            }
        case LOGOUT_SUCCESS:
            useToken.deleteToken();
        
            return {
                ...init
            }
        case ERROR:
            return {
                ...state,
                error: action.payload
            }
        default: return state;
    }
}
export default reducers;