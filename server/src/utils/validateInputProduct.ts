import { ProductInput } from './../types/ProductType';

const listColor = ['red','green','white','pink','yellow','orange','blue','brown','violet']

export const validateProductInput = (productInput: ProductInput) => {
    if (!productInput.title || productInput.title.length < 5)
        return {
            message: 'Invalid title',
            error: [
                { field: 'title', message: 'Length must greater than 5 characters' }
            ]
        }
    if (!productInput.categoryId)
        return {
            message: 'Invalid categoryId',
            error: [
                { field: 'categoryId', message: 'Product must include a category' }
            ]
        }
    if (!productInput.description || productInput.description.length < 50)
        return {
            message: 'Invalid description',
            error: [
                { field: 'description', message: 'Length must greater than 5 characters' }
            ]
        }
    if (!productInput.price || Number.isNaN(productInput.price))
        return {
            message: 'Invalid price',
            error: [
                { field: 'price', message: 'Price must be a number' }
            ]
        }
    const check = listColor.find(item => item === productInput.color);
    if (!productInput.color || !check) {
        return {
            message: 'Invalid color',
            error: [
                { field: 'color', message: `color must be a one of ${listColor.join(' ,')}` }
            ]
        }
    }
    return null;
}
