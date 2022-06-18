import AxiosService from '../config/configAxios'
import { API_END_POINT } from '../constants'
export const getCategoriesApi = async () => {
    return AxiosService.get(`${API_END_POINT}category/gets`)
}
export const getProductFromCategoryApi = async (id: string, limit: number, cursor = null) => {
    if (cursor)
        return AxiosService.get(`${API_END_POINT}category/products?id=${id}&limit=${limit}&cursor=${cursor}`)
    return AxiosService.get(`${API_END_POINT}category/products?id=${id}&limit=${limit}`)
}