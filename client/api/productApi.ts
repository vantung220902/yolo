import { ACCESS_TOKEN, API_END_POINT } from './../constants/index';
import AxiosService from '../config/configAxios'
import { AxiosResponse } from 'axios';
import { ResponseListProduct } from '../types/Product';
export const getProducts = async (limit: number, cursor = null) => {
    if (cursor) {
        return AxiosService.get(`${API_END_POINT}product/gets?limit=${limit}&cursor=${cursor}`)
    }
    return AxiosService.get(`${API_END_POINT}product/gets?limit=${limit}`)
}
export const getProductIds = async () => {
    const products = await <Promise<AxiosResponse<ResponseListProduct, ResponseListProduct>>>getProducts(4);
    return products.data.products?.map(item => ({
        params: {
            id: `${item.id}`
        }
    }))
}

export const getProductById = async (id: string) => {
    return AxiosService.get(`${API_END_POINT}product/getById?id=${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        }
    })
}