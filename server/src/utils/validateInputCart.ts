import { CartInputType } from "../types/CartType"
export const validateCartInput = (cartInput: CartInputType) => {
    if (!cartInput.productId)
        return {
            message: 'Invalid product',
            error: [
                { field: 'product', message: 'Please Choose Product To Cart' }
            ]
        }
    if (!cartInput.total || cartInput.total===0)
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
    return null;
}
