import axios, { AxiosInstance } from 'axios';

class AxiosService {
    private instance: AxiosInstance;
    constructor() {
        const instance = axios.create({
            timeout: 5000,

        });
        instance.interceptors.response.use(
            this.handleSuccess,
            this.handleError,
        );
        this.instance = instance;
    }
    handleSuccess(response: any) {
        return response;
    }
    handleError(error: any) {
        return Promise.reject(error);
    }
    get(url: string, config: any = null) {
        return this.instance.get(url, config);
    }
    post(url: string, data: any, config: any = null) {
        return this.instance.post(url, data, config);
    }
    put(url: string, data: any, config: any = null) {
        return this.instance.put(url, data, config);
    }
    delete(url: string, config: any = null) {
        return this.instance.delete(url, config);
    }
    patch(url: string, data: any, config: any = null) {
        return this.instance.patch(url, data, config);
    }
}
export default new AxiosService();
