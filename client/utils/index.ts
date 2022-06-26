import { CancelToken } from 'apisauce';
import appConfig from '../config'
export function newCancelToken(timeout = appConfig.CONNECTION_TIMEOUT) {
    const source = CancelToken.source();
    setTimeout(() => {
        source.cancel('CONNECTION_TIMEOUT');
    }, timeout);

    return { cancelToken: source.token };
}