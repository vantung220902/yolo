import { ResponseAuth } from './../redux/authRedux/type';
import apisauce, { ApiResponse } from 'apisauce'
import { LoginInput, RegisterInput } from '../redux/authRedux/type'
import { ResponseListProduct, ResponseProduct } from '../redux/productRedux/type'
import useToken from '../hooks/useToken'
import appConfig from '../config'
import { newCancelToken } from '../utils'
import { ResponseListCategory } from '../redux/categoryRedux/type';
const create = (baseURL = appConfig.API_END_POINT) => {
    const api = apisauce.create({
        baseURL,
        headers: {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            Expires: 0,
            Accept: 'application/json',
        },
        timeout: appConfig.CONNECTION_TIMEOUT,
    })
    api.axiosInstance.interceptors.request.use(config => {
        const token = useToken.getToken() ? useToken.getToken() : localStorage.getItem(appConfig.ACCESS_TOKEN)
        config.headers.Authorization = 'Bearer ' + token;
        return Promise.resolve(config)
    })

    /// =============Auth=============

    const login = (data: LoginInput): Promise<ApiResponse<ResponseAuth, ResponseAuth>> => {
        return api.post(`auth/login`, data)
    }
    const register = (data: RegisterInput): Promise<ApiResponse<ResponseAuth, ResponseAuth>> => {
        return api.post(`auth/register`, data)
    }
    const me = (): Promise<ApiResponse<ResponseAuth, ResponseAuth>> => {
        return api.get('auth/me', {}, newCancelToken())
    }
    const logout = (): Promise<ApiResponse<ResponseAuth, ResponseAuth>> => {
        return api.get('auth/logout')
    }

    const refreshToken = (): Promise<ApiResponse<ResponseAuth, ResponseAuth>> => {
        return api.get('auth/refreshToken', {}, {
            headers: {
                RefreshToken: 'Bearer ' + localStorage.getItem(appConfig.REFRESH_TOKEN)
            }
        })
    }


    //=========Product===========
    const getProducts = (limit: number, cursor = null): Promise<ApiResponse<ResponseListProduct, ResponseListProduct>> => {
        const url = cursor ? `product/gets?limit=${limit}&cursor=${cursor}` : `product/gets?limit=${limit}`;
        return api.get(url, {}, newCancelToken())
    }
    const getProductIds = async () => {
        const response = await getProducts(4);
        return response.data?.products?.map(item => ({
            params: {
                id: `${item.id}`
            }
        }))
    }

    const getProductById = (id: string): Promise<ApiResponse<ResponseProduct, ResponseProduct>> => {
        return api.get(`product/getById?id=${id}`, {}, newCancelToken())
    }

    //========Category===========
    const getCategories = (): Promise<ApiResponse<ResponseListCategory, ResponseListCategory>> => {
        return api.get(`category/gets`, {}, newCancelToken())
    }

    return {
        //====Auth====
        login,
        refreshToken,
        register,
        logout,
        me,
        //====Product====
        getProducts,
        getProductIds,
        getProductById,



        //====Category====
        getCategories,


    }
}

export type Apis = ReturnType<typeof create>

export default {
    create,
}