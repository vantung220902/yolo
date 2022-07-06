import { all } from '@redux-saga/core/effects';
import { API } from '../services';
import authSaga from './authRedux/saga';
import productSaga from './productRedux/saga'
import cartSaga from './cartRedux/saga'
const api = API.create();
function* rootSaga() {
    yield all([
        ...productSaga(api),
        ...authSaga(api),
        ...cartSaga(api)
    ])
}
export default rootSaga