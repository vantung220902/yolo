import { ProductOrder } from "../entities/ProductOrder";
import { Order } from "../entities/Order";
import { Product } from "../entities/Product";
import { validateCartInput } from "../utils/validateInputCart";
import { OrderInputType, ResponseOrder } from "../types/OrderType";
import { Request, Response } from "express";

export class OrderController {
  async addCart(
    req: Request,
    res: Response
  ): Promise<Response<ResponseOrder, Record<any, ResponseOrder>>> {
    try {
      const input = <OrderInputType>req.body;
      const userId = res.locals.userId;
      const validate = validateCartInput(input);
      if (validate !== null) {
        return res.status(401).json({
          code: 401,
          success: false,
          ...validate,
        });
      }
      const productIds = input.productId.split(",");
      const quantities = input.quantity.split(",");
      const newOrder = Order.create({
        userId,
      });
      await newOrder.save();
      for (let i = 0; i < productIds.length; i++) {
        const existingProduct = await Product.findOne({
          where: { id: parseInt(productIds[i], 10) },
        });
        if (!existingProduct)
          return res.status(401).json({
            code: 401,
            success: false,
            message: "Product is invalid",
            error: [
              {
                field: "product",
                message: `Product is invalid`,
              },
            ],
          });
        const newProductOrder = ProductOrder.create({
          orderId: newOrder.id,
          deliveryDate: input.deliveryDate,
          note: input.note,
          productId: parseInt(productIds[i], 10),
          quantity: parseInt(quantities[i], 10),
          secretUser: input.secret,
          address: input.address,
        });

        await newProductOrder.save();
      }
      return res.status(200).json({
        code: 200,
        success: true,
        message: "Create Cart Successfully",
      });
    } catch (error) {
      return res.status(501).json({
        code: 501,
        success: false,
        message: `Server internal error ${error.message}`,
      });
    }
  }
  async getOrderFromUserId(
    _req: Request,
    res: Response
  ): Promise<Response<ResponseOrder, Record<any, ResponseOrder>>> {
    try {
      const userId = res.locals.userId;
      const orders = await Order.createQueryBuilder("order")
        .innerJoinAndSelect("order.productOrder", "productOrder")
        .innerJoinAndSelect("productOrder.products", "product")
        .where("order.userId = :userId", { userId })
        .groupBy("order.id")
        .addGroupBy("product.id")
        .addGroupBy("productOrder.id")
        .getMany();

      return res.status(200).json({
        code: 200,
        success: true,
        message: "Get Order Successfully",
        data: orders,
      });
    } catch (error) {
      console.log("error", error);
      return res.status(501).json({
        code: 501,
        success: false,
        message: `Server internal error ${error.message}`,
      });
    }
  }
}
