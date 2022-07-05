import { CancelToken } from 'apisauce';
import appConfig from '../config'
export function newCancelToken(timeout = appConfig.CONNECTION_TIMEOUT) {
    const source = CancelToken.source();
    setTimeout(() => {
        source.cancel('CONNECTION_TIMEOUT');
    }, timeout);

    return { cancelToken: source.token };
}
export function addDays(date: string, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
export const TODAY = new Date().toISOString().slice(0, 10) 