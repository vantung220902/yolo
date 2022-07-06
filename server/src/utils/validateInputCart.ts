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
    if (!cartInput.quantity || cartInput.quantity.length === 0)
        return {
            message: 'Invalid total',
            error: [
                { field: 'total', message: 'Please Choose Number For Product > 0' }
            ]
        }
    if (!cartInput.secret || cartInput.secret.length < 4)
        return {
            message: 'Invalid secret',
            error: [
                { field: 'secret', message: 'Please Enter Secret User' }
            ]
        }
    if (!cartInput.deliveryDate || new Date(cartInput.deliveryDate) < addDays(TODAY, 3)) {
        return {
            message: 'Invalid delivery Date',
            error: [
                { field: 'deliveryDate', message: 'The Delivery At The Least 3 Days' }
            ]
        }
    }
    if (!cartInput.address || cartInput.address.length <= 6) {
        return {
            message: 'Invalid delivery Address',
            error: [{
                field: 'address', message: 'The Address At The Least 10 Characters'
            }]
        }
    }
    return null;
}
