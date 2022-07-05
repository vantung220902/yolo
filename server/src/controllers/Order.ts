import { ProductOrder } from '../entities/ProductOrder';
import { Order } from '../entities/Order';
import { Product } from '../entities/Product';
import { validateCartInput } from '../utils/validateInputCart';
import { OrderInputType, ResponseOrder } from '../types/OrderType';
import { Request, Response } from 'express';


export class OrderController {
    async addCart(req: Request, res: Response): Promise<Response<ResponseOrder, Record<any, ResponseOrder>>> {
        try {
            const input = <OrderInputType>req.body;
            const userId = res.locals.userId;
            const validate = validateCartInput(input);
            if (validate !== null) {
                return res.json({
                    code: 401,
                    success: false,
                    ...validate
                })
            }
            const productIds = input.productId.split(',');
            const quantities = input.quantity.split(',');
            for (let i = 0; i < productIds.length - 1; i++) {
                const existingProduct = await Product.findOne({
                    where: { id: parseInt(productIds[i], 10) }
                });
                if (!existingProduct) return res.json({
                    code: 401,
                    success: false,
                    message: 'Product is invalid',
                    error: [
                        {
                            field: 'product',
                            message: `Product is invalid`
                        }
                    ]
                });
                const newOrder = Order.create({
                    userId,
                });
                await newOrder.save();

                const newProductOrder = ProductOrder.create({
                    orderId: newOrder.id,
                    deliveryDate: input.deliveryData,
                    note: input.note,
                    productId: parseInt(productIds[i], 10),
                    quantity: parseInt(quantities[i], 10),
                    secretUser: input.secretUser,
                });

                await newProductOrder.save();
            }
            return res.json({
                code: 200,
                success: true,
                message: 'Create Cart Successfully',

            })
        } catch (error) {
            return res.json({
                code: 501,
                success: false,
                message: `Server internal error ${error.message}`,
            })
        }
    }
}
