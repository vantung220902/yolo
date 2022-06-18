import { all } from '@redux-saga/core/effects';
import { authSaga } from './auth';
import { productSaga } from './product'
function* rootSaga() {
    yield all({
        ...authSaga,
        ...productSaga,
    })
}
export default rootSaga