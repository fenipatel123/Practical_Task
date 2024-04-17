
import { Request, Response } from 'express';
import CartModel from '../models/cart' ;
import OrderModel from '../models/order';

export async function placeOrder(req: Request, res: Response): Promise<void> {
  const userId = req.user?._id; 

  try {
    let cart= await CartModel.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      res.status(400).send({ message: 'Cart is empty. Add items to cart before placing an order' });
      return;
    }

    const order = new OrderModel({
      userId,
      cartId: cart._id, 
      items: cart.items.map(item => ({ productId: item.productId, quantity: item.quantity })),
    });

    await order.save();

    cart.items = [];
    await cart.save();

    res.status(200).send({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error while processing your request!',error });
  }
}
