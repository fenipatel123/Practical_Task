import { Request, Response } from 'express';
import ProductModel from '../models/productModel';
import { Product } from '../interface/products'
import { FilterQuery } from 'mongoose'

export const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, category } = req.body;

    const newProduct = new ProductModel({
      name,
      description,
      price,
      category,
    });

    await newProduct.save();

    res.status(201).send({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error while processing your request!',error });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const productId  = req.params.id;
      const { name, description, price, category } = req.body;

      const updatedProduct : Product | null= await ProductModel.findOneAndUpdate(
        { _id: productId },
        { $set: { name, description, price, category } },
        { merge: true } 
      );
  
      if (!updatedProduct) {
        res.status(404).send({ message: 'Product data not found' });
        return;
      }
  
      res.status(200).send({ message: 'Product updated successfully'});
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).send({ message: 'Internal server error while processing your request!',error });
    }
  };

  export const deleteProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const  productId   = req.params.id;
  
      const result: Product | null = await ProductModel.findByIdAndDelete(productId);
  
      if (!result) {
        res.status(404).send({ message: 'Product data not found' });
        return;
      }
  
      res.status(200).send({ message: 'Product hase been Deleted successfully'});
    } catch (error) {
      res.status(500).send({ message: 'Internal server error while updating category', error });
    }
  };

  export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products: Product[] = await ProductModel.find()
        .populate('category','name')

        if (products) {
            res.status(200).send({
                message: 'Products details are fetched successfully',
                listOfProducts: products
            });
            return;
        }

        res.status(200).send({});
    } catch (error) {
        res.status(500).send({ message: 'Internal server error while processing your request!', error });
    }
};

export const listProductWithPagination = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const parsedPage = parseInt(page as string, 10);
    const parsedLimit = parseInt(limit as string, 10);
    const skip = (parsedPage - 1) * parsedLimit;

    const products :Product[] | null = await ProductModel.find()
      .populate('category','name') 
      .skip(skip)
      .limit(parsedLimit)
      .exec();

    const total = await ProductModel.countDocuments().exec();

    res.status(200).send({
      products: products,
      page: parsedPage,
      totalCount: total,
      totalPages: Math.ceil(total / parsedLimit),
      
    });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error while processing your request!', error });
  }
};

export const getAllProductsWithFilters = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, minPrice, maxPrice } = req.query;

    const filters: FilterQuery<any> = {};
    if (typeof name === 'string') filters.name = new RegExp(name, 'i'); 
    if (typeof minPrice === 'string' && !isNaN(Number(minPrice))) filters.price = { $gte: Number(minPrice) }; 
    if (typeof maxPrice === 'string' && !isNaN(Number(maxPrice))) {
      if (filters.price) filters.price.$lte = Number(maxPrice);
      else filters.price = { $lte: Number(maxPrice) };
    }

    const products : Product[] | null= await ProductModel.find(filters)
      .populate('category', 'name') 
      .exec();

    res.status(200).send({products});
  } catch (error) {
    res.status(500).send({ message: 'Internal server error while processing your request!',error });
  }
};