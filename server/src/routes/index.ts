import {Express} from 'express'
import auth from './auth'
import hello from './hello'
import category from './category'
import product from './product'

function route(app: Express) {
    
    app.use('/api/auth', auth);

    app.use('/api/hello', hello);

    app.use('/api/category', category);
    
    app.use('/api/product', product);
    

}

export default route;