import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import mySaga from './rootSaga';
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers =
    (typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
const sagaMiddleware = createSagaMiddleware();
const store = () => {
    const middleware = [sagaMiddleware];
    const enhancers = [applyMiddleware(...middleware)];
    const store = createStore(rootReducer, composeEnhancers(...enhancers));
    sagaMiddleware.run(mySaga);
    return store;
};

export default store;
