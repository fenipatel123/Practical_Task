import mongoose from 'mongoose';

export interface Product{
    name: string;
    description: string;
    price: number;
    categoryId: mongoose.Types.ObjectId; 
    createdAt: Date;
    updatedAt: Date;
}
  