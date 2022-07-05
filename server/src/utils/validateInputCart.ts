import { TODAY } from './../constant/index';
import { OrderInputType } from "../types/OrderType"
import { addDays } from './date';
export const validateCartInput = (cartInput: OrderInputType) => {
    if (!cartInput.productId)
        return {
            message: 'Invalid product',
            error: [
                { field: 'product', message: 'Please Choose Product To Cart' }
            ]
        }
    if (!cartInput.quantity || cartInput.quantity === 0)
        return {
            message: 'Invalid total',
            error: [
                { field: 'total', message: 'Please Choose Number For Product > 0' }
            ]
        }
    if (!cartInput.secretUser || cartInput.secretUser.length < 4)
        return {
            message: 'Invalid secretUser',
            error: [
                { field: 'secretUser', message: 'Please Enter Secret User' }
            ]
        }
    if (!cartInput.deliveryData || new Date(cartInput.deliveryData) < addDays(TODAY, 3)) {
        return {
            message: 'Invalid delivery Data',
            error: [
                { field: 'deliveryData', message: 'The Delivery At The Least 3 Days' }
            ]
        }
    }
    return null;
}
