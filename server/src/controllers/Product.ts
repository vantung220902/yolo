import { Request, Response } from "express";
import { LessThan, Like } from "typeorm";
import cloudinaryImageUploadMethod from "../utils/cloudinary";
import { Product } from "./../entities/Product";
import {
  ProductInput,
  ResponseListProduct,
  ResponseProduct,
} from "./../types/ProductType";
import { validateProductInput } from "./../utils/validateInputProduct";

export class ProductController {
  async addProduct(
    req: Request,
    res: Response
  ): Promise<Response<ResponseProduct, Record<any, ResponseProduct>>> {
    try {
      const { title, categoryId, color, description, price } = <ProductInput>(
        req.body
      );
      const validate = validateProductInput({
        title,
        categoryId,
        color,
        description,
        price,
      });
      if (validate !== null) {
        return res.status(401).json({
          code: 401,
          success: false,
          ...validate,
        });
      }
      if (!req.files || req.files?.length < 1) {
        return res.status(401).json({
          code: 401,
          success: false,
          message: "Please choose image",
          error: [
            {
              field: "images",
              message: `Invalidate image`,
            },
          ],
        });
      }
      const image = [];
      const files = req.files as Express.Multer.File[];
      for (const file of files) {
        const { path } = file;
        const newPath: any = await cloudinaryImageUploadMethod(path);
        image.push(`${newPath.res};`);
      }
      const { userId } = res.locals;
      const newProduct = Product.create({
        title,
        categoryId,
        color,
        description,
        price,
        userId,
        image: image.join(""),
      });
      await newProduct.save();
      return res.status(200).json({
        code: 200,
        success: true,
        message: "Create Product Successfully",
        product: newProduct,
      });
    } catch (error) {
      return res.status(501).json({
        code: 501,
        success: false,
        message: `Server internal error ${error.message}`,
      });
    }
  }
  async listProducts(
    req: Request,
    res: Response
  ): Promise<Response<ResponseListProduct, Record<any, ResponseListProduct>>> {
    try {
      const { limit, cursor, q = "" } = req.query;
      if (!limit || isNaN(parseInt(limit as string, 10))) {
        return res.status(401).json({
          code: 401,
          success: false,
          message: "Limit is required",
        });
      }
      const realLimit = Math.min(10, parseInt(limit as string, 10));
      let array = [];
      const findOptions: { [key: string]: any } = {
        order: {
          createdAt: "DESC",
        },
        take: realLimit,
      };
      let lastProduct: Product[] = [];
      const isNumber = !isNaN(parseInt(q as string, 10));
      if (cursor !== undefined) {
        array = [
          isNumber
            ? {
                categoryId: parseInt(q as string, 10),
                createdAt: LessThan(cursor),
              }
            : null,
          { title: Like(`%${q}%`), createdAt: LessThan(cursor) },
          { color: Like(`%${q}%`), createdAt: LessThan(cursor) },
          { description: Like(`%${q}%`), createdAt: LessThan(cursor) },
        ];
        findOptions.where = array;
        lastProduct = await Product.find({
          where: findOptions.where,
          take: 1,
        });
      } else {
        array = [
          isNumber ? { categoryId: parseInt(q as string, 10) } : null,
          { title: Like(`%${q}%`) },
          { color: Like(`%${q}%`) },
          { description: Like(`%${q}%`) },
        ];
        findOptions.where = array;
      }
      const listProducts = await Product.find(findOptions);
      const endList = listProducts[listProducts.length - 1];
      const totalCount = await Product.count({
        where: findOptions.where,
      });
      return res.status(200).json({
        code: 200,
        success: true,
        message: "Get list Product successfully",
        totalCount,
        cursor: endList?.createdAt,
        hasMore:
          cursor && endList
            ? endList.createdAt.toString() !==
              lastProduct[0].createdAt.toString()
            : listProducts.length !== totalCount,
        products: listProducts,
      });
    } catch (error) {
      console.error("error", error);
      return res.status(501).json({
        code: 501,
        success: false,
        message: `Server internal error ${error.message}`,
      });
    }
  }
  async getProductById(
    req: Request,
    res: Response
  ): Promise<Response<ResponseProduct, Record<any, ResponseProduct>>> {
    try {
      const { id } = req.query;
      if (!id || isNaN(parseInt(id as string, 10))) {
        return res.status(401).json({
          code: 401,
          success: false,
          message: "Please choose id",
          error: [
            {
              field: "id",
              message: `Invalidate id`,
            },
          ],
        });
      }
      const existingProduct = await Product.findOne({
        where: {
          id: parseInt(id as string, 10),
        },
      });
      if (!existingProduct) {
        return res.status(401).json({
          code: 401,
          success: false,
          message: "Product not found",
          error: [
            {
              field: "product",
              message: `Product not found for id=${id}`,
            },
          ],
        });
      }
      return res.status(200).json({
        code: 200,
        success: true,
        message: "Get product successfully",
        product: existingProduct,
      });
    } catch (error) {
      return res.status(501).json({
        code: 501,
        success: false,
        message: `Server internal error ${error.message}`,
      });
    }
  }
}
