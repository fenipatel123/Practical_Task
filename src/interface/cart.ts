import mongoose from 'mongoose';

export interface CartItem {
    productId: mongoose.Types.ObjectId;
    quantity: number;
  }
  
  export interface Cart{
    userId: mongoose.Types.ObjectId;
    items: CartItem[];
  }