import { Request, Response } from 'express';
import ProductModel from '../models/productModel';
import { Product } from '../interface/products'

export const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, categoryId } = req.body;

    const newProduct = new ProductModel({
      name,
      description,
      price,
      categoryId,
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
      const { name, description, price, categoryId } = req.body;

      const updatedProduct : Product | null= await ProductModel.findOneAndUpdate(
        { _id: productId },
        { $set: { name, description, price, categoryId } },
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
        const products: Product[] = await ProductModel.find();

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