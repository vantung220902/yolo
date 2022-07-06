import { Product } from './../entities/Product';
import { Category } from './../entities/Category';
import { CategoryInput, ResponseCategory, ResponseProductFromCategory } from './../types/CategoryType';
import { Request, Response } from "express";
import { LessThan } from 'typeorm';

export class CategoryController {

    async addCategory(req: Request, res: Response): Promise<Response<ResponseCategory, Record<any, ResponseCategory>>> {
        try {
            const { title } = <CategoryInput>req.body;
            if (!title || title.length < 5) {
                return res.status(401).json({
                    code: 401,
                    success: false,
                    message: 'Please your title for category',
                    error: [
                        {
                            field: 'title',
                            message: `Title is empty or least 5 characters`
                        }
                    ]

                })
            }
            const existingCategory = await Category.find({ where: { title } });
            if (!existingCategory) {
                return res.status(401).json({
                    code: 401,
                    success: false,
                    message: 'Title is already',
                    error: [
                        {
                            field: 'title',
                            message: `Title is already`
                        }
                    ]

                })
            }

            const newCategory = Category.create({
                title,
            });
            await newCategory.save();
            return res.status(200).json({
                code: 200,
                success: true,
                message: 'Title is already',
                category: newCategory
            })
        } catch (error) {
            return res.status(501).json({
                code: 501,
                success: false,
                message: `Server internal error ${error.message}`,
            })
        }
    }
    async listCategories(_req: Request, res: Response): Promise<Response<ResponseCategory, Record<any, ResponseCategory>>> {
        try {
            const listCategories = await Category.find();
            return res.status(200).json({
                code: 200,
                success: true,
                message: 'Get list category successfully',
                categories: listCategories
            })
        } catch (error) {
            return res.status(501).json({
                code: 501,
                success: false,
                message: `Server internal error ${error.message}`,
            })
        }
    }
    async getProductsFromCategory(req: Request, res: Response): Promise<Response<ResponseProductFromCategory, Record<any, ResponseProductFromCategory>>> {
        try {
            const id = req.query.id as string;
            if (!id) {
                return res.json({
                    code: 401,
                    success: false,
                    message: 'Empty id',
                    error: [
                        {
                            field: 'id',
                            message: `Id is empty`
                        }
                    ]

                })
            }
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
            const categoryId = parseInt(id, 10)
            if (cursor) {
                findOptions.where = { createdAt: LessThan(cursor), categoryId, }
                lastProduct = await Product.find({ where: { categoryId }, order: { createdAt: 'ASC' }, take: 1 });
            } else {
                findOptions.where = { categoryId }
            }
            const listProducts = await Product.find(findOptions);
            const endList = listProducts[listProducts.length - 1];
            const endCursor = endList ? endList.createdAt : cursor
            return res.json({
                code: 200,
                success: true,
                message: 'List product from category successfully',
                totalCount,
                cursor: endCursor,
                hasMore: cursor ? endCursor?.toString() !== lastProduct[0].createdAt.toString()
                    : listProducts.length !== totalCount,
                products: listProducts
            })

        } catch (error) {
            console.error('ERROR', error)
            return res.json({
                code: 501,
                success: false,
                message: `Server internal error ${error.message}`,
            })
        }
    }
}