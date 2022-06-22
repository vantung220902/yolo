import { CartController } from './../controllers/Cart';

import express from 'express'
const Cart = new CartController();
const router = express.Router();

router.post('/add', Cart.addCart);

export default router;