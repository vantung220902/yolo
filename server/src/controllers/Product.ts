import { Product } from './../entities/Product';
import { validateProductInput } from './../utils/validateInputProduct';
import { ProductInput, ResponseListProduct, ResponseProduct } from './../types/ProductType';
import { Request, Response } from "express";
import cloudinaryImageUploadMethod from '../utils/cloudinary';
import { LessThan } from 'typeorm';

export class ProductController {

    async addProduct(req: Request, res: Response): Promise<Response<ResponseProduct, Record<any, ResponseProduct>>> {
        try {
            const { title, categoryId, color, description, price } = <ProductInput>req.body;
            const validate = validateProductInput({ title, categoryId, color, description, price });
            if (validate !== null) {
                return res.json({
                    code: 401,
                    success: false,
                    ...validate
                })
            }
            if (!req.files || req.files?.length < 1) {
                return res.json({
                    code: 401,
                    success: false,
                    message: 'Please choose image',
                    error: [
                        {
                            field: 'images',
                            message: `Invalidate image`
                        }
                    ]

                })
            }
            const image = [];
            const files = req.files as Express.Multer.File[];
            for (const file of files) {
                const { path } = file;
                const newPath: any = await cloudinaryImageUploadMethod(path);
                image.push(`${newPath.res};`)
            }
            const { userId } = res.locals;
            const newProduct = Product.create({
                title,
                categoryId,
                color,
                description,
                price,
                userId,
                image: image.join(''),
            });
            await newProduct.save();
            return res.json({
                code: 200,
                success: true,
                message: 'Create Product Successfully',
                product: newProduct
            })
        } catch (error) {
            return res.json({
                code: 501,
                success: false,
                message: `Server internal error ${error.message}`,
            })
        }
    }
    async listProducts(req: Request, res: Response): Promise<Response<ResponseListProduct, Record<any, ResponseListProduct>>> {
        try {
            const { limit, cursor } = req.query;
            const totalCount = await Product.count();
            const realLimit = Math.min(10, parseInt(limit as string, 10));
            const findOptions: { [key: string]: any } = {
                order: {
                    createdAt: 'DESC'
                },
                take: realLimit
            }
            let lastProduct: Product[] = [];
            if (cursor) {
                findOptions.where = { createdAt: LessThan(cursor) }
                lastProduct = await Product.find({ order: { createdAt: 'ASC' }, take: 1 });
            }
            const listProducts = await Product.find(findOptions);
            const endList = listProducts[listProducts.length - 1];
            return res.json({
                code: 200,
                success: true,
                message: 'Get list Product successfully',
                totalCount,
                cursor: endList.createdAt,
                hasMore: cursor ? endList.createdAt.toString() !== lastProduct[0].createdAt.toString()
                    : listProducts.length !== totalCount,
                products: listProducts
            })
        } catch (error) {
            return res.json({
                code: 501,
                success: false,
                message: `Server internal error ${error.message}`,
            })
        }
    }
    async getProductById(req: Request, res: Response): Promise<Response<ResponseProduct, Record<any, ResponseProduct>>> {
        try {
            const { id } = req.query;
            if (!id) {
                return res.json({
                    code: 401,
                    success: false,
                    message: 'Please choose id',
                    error: [
                        {
                            field: 'id',
                            message: `Invalidate id`
                        }
                    ]

                })
            }
            const existingProduct = await Product.findOne({
                where: {
                    id:parseInt(id as string,10)
                }
            });
            if (!existingProduct) {
                return res.json({
                    code: 401,
                    success: false,
                    message: 'Product not found',
                    error: [
                        {
                            field: 'product',
                            message: `Product not found for id=${id}`
                        }
                    ]

                })
            }
            return res.json({
                code: 200,
                success: true,
                message: 'Get product successfully',
                product: existingProduct
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