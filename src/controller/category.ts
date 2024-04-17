import { Request, Response } from 'express';
import CategoryModel from '../models/categoryModel';
import { Category } from '../interface/category';


export const addCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body;

        const newCategory = new CategoryModel({ name });

        await newCategory.save();
        res.status(201).send({
            message: 'Category added successfully',
            categories: newCategory
        });

    } catch (error) {
        res.status(500).send({ message: 'Internal server error while processing your request!', error });
    }
};

export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories: Category[] = await CategoryModel.find();

        if (categories) {
            res.status(200).send({
                message: 'Categories fetched successfully',
                listCategories: categories
            });
            return;
        }

        res.status(200).send({});
    } catch (error) {
        res.status(500).send({ message: 'Internal server error while processing your request!', error });
    }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const  categoryId  = req.params.id;
      const { name } = req.body;
  
      // Validate input data
      if (!name) {
        res.status(400).json({ message: 'Name is required field!' });
        return;
      }
  
      const updatedCategory: Category | null = await CategoryModel.findByIdAndUpdate(
        categoryId,
        { name },
        { merge: true } 
      );
  
      if (!updatedCategory) {
        res.status(404).send({ message: 'Category data not found' });
        return;
      }
  
      res.status(200).send({ message: 'Category updated successfully'});
    } catch (error) {
      res.status(500).send({ message: 'Internal server error while updating category', error });
    }
  };

  export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const  categoryId  = req.params.id;
  
      const result: Category | null = await CategoryModel.findByIdAndDelete(categoryId);
  
      if (!result) {
        res.status(404).send({ message: 'Category data not found' });
        return;
      }
  
      res.status(200).send({ message: 'Category Deleted successfully'});
    } catch (error) {
      res.status(500).send({ message: 'Internal server error while updating category', error });
    }
  };



