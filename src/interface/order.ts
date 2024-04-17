import mongoose from 'mongoose';

export interface OrderItem {
    productId: mongoose.Types.ObjectId;
    quantity: number;
  }
  
  export  interface Order{
    userId: mongoose.Types.ObjectId;
    cartId: mongoose.Types.ObjectId; 
    items: OrderItem[];
    createdAt: Date;
  }
  
  