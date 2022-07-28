import { createReducer } from 'typesafe-actions';
import useToken from '../../hooks/useToken';
import {
  forgotPasswordAsync,
  getMeAsync,
  loginAsync,
  logoutAsync,
  registerAsync,
  changePasswordAsync,
} from './actions';
import { IMe } from './type';

export interface IAuthReducer {
  user?: IMe;
  accessToken?: string;
  error?: FieldError[];
  refreshToken: String;
  loading: boolean;
}
const init: IAuthReducer = {
  user: undefined,
  accessToken: '',
  error: [],
  refreshToken: '',
  loading: false,
};

export default createReducer(init)
  .handleAction(loginAsync.request, (state: IAuthReducer) => ({
    ...state,
    loading: true,
  }))
  .handleAction(
    loginAsync.success,
    (state: IAuthReducer, action: ReturnType<typeof loginAsync.success>) => {
      useToken.setToken(
        action.payload.accessToken as string,
        action.payload.refreshToken as string,
      );
      return {
        ...state,
        user: <IMe>action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        loading: false,
      };
    },
  )
  .handleAction(
    loginAsync.failure,
    (state: IAuthReducer, action: ReturnType<typeof loginAsync.failure>) => ({
      ...state,
      error: action.payload,
      loading: false,
    }),
  )
  .handleAction(registerAsync.request, (state: IAuthReducer) => ({
    ...state,
    loading: true,
  }))
  .handleAction(
    registerAsync.success,
    (state: IAuthReducer, action: ReturnType<typeof registerAsync.success>) => {
      useToken.setToken(
        action.payload.accessToken as string,
        action.payload.refreshToken as string,
      );
      return {
        ...state,
        user: <IMe>action.payload.user,
        accessToken: action.payload.accessToken,
        loading: false,
      };
    },
  )
  .handleAction(
    registerAsync.failure,
    (state: IAuthReducer, action: ReturnType<typeof registerAsync.failure>) => ({
      ...state,
      error: action.payload,
      loading: false,
    }),
  )
  .handleAction(logoutAsync.request, (state: IAuthReducer) => ({
    ...state,
    loading: true,
  }))
  .handleAction(logoutAsync.success, (_state: IAuthReducer) => {
    useToken.deleteToken();
    return {
      ...init,
      loading: false,
    };
  })
  .handleAction(
    logoutAsync.failure,
    (state: IAuthReducer, action: ReturnType<typeof logoutAsync.failure>) => ({
      ...state,
      error: action.payload,
      loading: false,
    }),
  )
  .handleAction(getMeAsync.request, (state: IAuthReducer) => ({
    ...state,
    loading: true,
  }))
  .handleAction(
    getMeAsync.success,
    (state: IAuthReducer, action: ReturnType<typeof getMeAsync.success>) => ({
      ...state,
      user: action.payload,
      loading: false,
    }),
  )
  .handleAction(
    getMeAsync.failure,
    (state: IAuthReducer, action: ReturnType<typeof getMeAsync.failure>) => ({
      ...state,
      error: action.payload,
      loading: false,
    }),
  )
  .handleAction(forgotPasswordAsync.request, (state: IAuthReducer) => ({
    ...state,
    loading: true,
  }))
  .handleAction(forgotPasswordAsync.success, (state: IAuthReducer) => ({
    ...state,
    loading: false,
  }))
  .handleAction(
    forgotPasswordAsync.failure,
    (state: IAuthReducer, action: ReturnType<typeof forgotPasswordAsync.failure>) => ({
      ...state,
      error: action.payload,
      loading: false,
    }),
  )
  .handleAction(changePasswordAsync.request, (state: IAuthReducer) => ({
    ...state,
    loading: true,
  }))
  .handleAction(
    changePasswordAsync.success,
    (state: IAuthReducer, action: ReturnType<typeof changePasswordAsync.success>) => ({
      ...state,
      loading: false,
      user: action.payload.user,
      accessToken: action.payload.accessToken,
      refreshToken: action.payload.refreshToken,
    }),
  )
  .handleAction(changePasswordAsync.request, (state: IAuthReducer) => ({
    ...state,
    loading: false,
  }));
