import { OrderController } from "../controllers/Order";

import express from "express";
const Cart = new OrderController();
const router = express.Router();

router.post("/add", Cart.addCart);

router.get("/", Cart.getOrderFromUserId);

export default router;
