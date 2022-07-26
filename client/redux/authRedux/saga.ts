import { call, takeLatest } from 'redux-saga/effects';
import { toastifyErrorSaga } from 'redux/commonRedux/toastifyFailureRedux';
import { Apis } from '../../services/api';
import { callApi } from '../commonRedux/callApi';
import { changePasswordAsync, forgotPasswordAsync, getMeAsync, loginAsync, logoutAsync, registerAsync, updateUserAsync } from './actions';

function* login(api: any, action: any) {
  yield call(
    callApi as any,
    api,
    {
      asyncAction: loginAsync,
      responseExtractor: (res: any) => res,
      onFailure: toastifyErrorSaga,
    },
    action.payload,
  );
}

function* register(api: any, action: any) {
  yield call(
    callApi as any,
    api,
    {
      asyncAction: registerAsync,
      responseExtractor: (res: any) => res,
      onFailure: toastifyErrorSaga,
    },
    action.payload,
  );
}
function* logout(api: any) {
  yield call(callApi as any, api, {
    asyncAction: registerAsync,
    responseExtractor: (res: any) => res,
    onFailure: toastifyErrorSaga,
  });
}

function* me(api: any) {
  yield call(callApi as any, api, {
    asyncAction: registerAsync,
    responseExtractor: (res: any) => res,
    onFailure: toastifyErrorSaga,
  });
}
function* updateProfile(api: any, action: ReturnType<typeof updateUserAsync.request>) {
  yield call(
    callApi as any,
    api,
    {
      asyncAction: updateUserAsync,
      responseExtractor: (res: any) => res,
      onFailure: toastifyErrorSaga,
    },
    action.payload,
  );
}
function* forgotPassword(api: any, action: ReturnType<typeof forgotPasswordAsync.request>) {
  yield call(
    callApi as any,
    api,
    {
      asyncAction: forgotPasswordAsync,
      responseExtractor: (res: any) => res,
      onFailure: toastifyErrorSaga,
    },
    action.payload,
  );
}
function* changePassword(api: any, action: ReturnType<typeof changePasswordAsync.request>) {
  yield call(
    callApi as any,
    api,
    {
      asyncAction: changePasswordAsync,
      responseExtractor: (res: any) => res,
      onFailure: toastifyErrorSaga,
    },
    action.payload,
  );
}
export default function authSaga(apiInstance: Apis) {
  return [
    takeLatest(registerAsync.request, register, apiInstance.register),
    takeLatest(loginAsync.request, login, apiInstance.login),
    takeLatest(logoutAsync.request, logout, apiInstance.logout),
    takeLatest(getMeAsync.request, me, apiInstance.me),
    takeLatest(updateUserAsync.request, updateProfile, apiInstance.updateProfile),
    takeLatest(forgotPasswordAsync.request, forgotPassword, apiInstance.forgotPassword),
    takeLatest(changePasswordAsync.request, changePassword, apiInstance.changePassword),
  ];
}
