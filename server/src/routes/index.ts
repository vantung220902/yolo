import { checkAuth } from './../middleware/checkAuth';
import { Express } from 'express'
import auth from './auth'
import hello from './hello'
import category from './category'
import product from './product'
import cart from './cart'

function route(app: Express) {

    app.use('/api/auth', auth);

    app.use('/api/hello', hello);

    app.use('/api/category', category);

    app.use('/api/product', product);

    app.use('/api/cart', checkAuth, cart)

}

export default route;