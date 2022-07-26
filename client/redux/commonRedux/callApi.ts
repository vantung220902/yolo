import { Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { AsyncActionCreatorBuilder } from 'typesafe-actions';

export function* callApi<TResponse extends unknown = any, TError extends Error = Error>(
  api: any,
  action: {
    asyncAction: AsyncActionCreatorBuilder<any, [string, [TResponse, any]], [string, [TError, any]]>;
    responseExtractor?: (res: any) => TResponse;
    errorBuilder?: (err: any) => any;
    onSuccess?: Saga;
    onFailure?: Saga;
  },
  ...args: any[]
) {
  const { asyncAction, responseExtractor = (res) => res, errorBuilder = (err) => err, onSuccess, onFailure } = action;
  try {
    const response: ResponseGenerator = yield call(api, ...args);
    if (response.status === 200 && response.data.success) {
      yield put(asyncAction.success(responseExtractor(response.data), undefined));
      if (onSuccess) {
        yield call(action.onSuccess as any, response);
      }
    } else {
      yield put(asyncAction.failure(errorBuilder(response.data.error), undefined));
      if (onFailure) {
        yield call(onFailure, response);
      }
    }
  } catch (error) {
    console.error('Error In Call Api', error);
    yield put(asyncAction.failure(errorBuilder(error), undefined));
    if (onFailure) {
      yield call(onFailure, error);
    }
  }
}
