import { checkAuth } from './../middleware/checkAuth';
import { CategoryController } from './../controllers/Category';
import express from 'express'
const Category = new CategoryController();
const router = express.Router();

router.get('/gets', Category.listCategories);

router.get('/products', Category.getProductsFromCategory);

router.post('/add', checkAuth,Category.addCategory);

export default router;