import mongoose, { Schema, Model } from 'mongoose';
import { Order } from '../interface/order';


const OrderSchema = new Schema<Order>(
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true },
      cartId: { type:mongoose.Schema.Types.ObjectId,ref: 'Cart', required: true },
      items: [
        {
          productId: { type: mongoose.Schema.Types.ObjectId,ref: 'Product', required: true },
          quantity: { type: Number, required: true },
        },
      ],
    },
    { timestamps: true }
  );
  
  const OrderModel = mongoose.model<Order>('Order', OrderSchema);
  
  export default OrderModel;