import { Cart } from './../entities/Cart';
import { Product } from './../entities/Product';
import { validateCartInput } from './../utils/validateInputCart';
import { CartInputType, ResponseCart } from './../types/CartType';
import { Request, Response } from 'express';


export class CartController {
    async addCart(req: Request, res: Response): Promise<Response<ResponseCart, Record<any, ResponseCart>>> {
        try {
            const input = <CartInputType>req.body;
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
                const newCart = Cart.create({
                    userId,
                    productId: parseInt(productIds[i], 10),
                    total: input.total,
                    secretUser: input.secretUser
                });
                await newCart.save();
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
