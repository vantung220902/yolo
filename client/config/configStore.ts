import { createStore, compose, applyMiddleware, Store, AnyAction, Action } from 'redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import mySaga from '../middlewares';
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
