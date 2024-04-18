
import mongoose, { Schema, Model } from 'mongoose';
import { Cart, CartItem } from '../interface/cart';

const cartSchema = new Schema<Cart>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number},
  }],
});

const CartModel: Model<Cart> = mongoose.model<Cart>('Cart', cartSchema);

export default CartModel;