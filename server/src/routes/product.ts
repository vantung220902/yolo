import { checkAuth } from './../middleware/checkAuth';
import { ProductController } from './../controllers/Product';
import express from 'express'
import storage from './../middleware/uploadFile';
const Product = new ProductController();
const router = express.Router();

router.post('/add', checkAuth,storage.array('images', 2), Product.addProduct);

router.get('/gets', Product.listProducts);


router.get('/getById', Product.getProductById);

export default router;