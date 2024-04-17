import { Request, Response } from 'express';
import CartModel from '../models/cart';
import { Cart } from '../interface/cart'


export async function addToCart(req: Request, res: Response): Promise<void> {
  const { productId, quantity } = req.body;
  const userId = req.user?._id;

  try {
    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      cart = new CartModel({ userId, items: [] });
    }
    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 0) + (quantity || 1);
    } else {
      cart.items.push({ productId, quantity: quantity || 1 });
    }

    await cart.save();
    res.status(200).send({ message: 'Product added to cart successfully', cart });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error while processing your request!',error});
  }
}

export async function updateCart(req: Request, res: Response): Promise<void> {
    const { productId, quantity } = req.body;
    const userId = req.user?._id; 
  
    try {
      let cart= await CartModel.findOne({ userId });
  
      if (!cart) {
        res.status(404).send({ message: 'Cart not found for the user' });
        return;
      }
      const existingItem = cart.items.find(item => item.productId.toString() === productId);
  
      if (!existingItem) {
        res.status(404).send({ message: 'Product not found in the cart' });
        return;
      }
  
      existingItem.quantity = quantity || existingItem.quantity;
  
      await cart.save();
      res.status(200).send({ message: 'Cart updated successfully', cart });
    } catch (error) {
      res.status(500).send({ message: 'Internal server error while processing your request!', error});
    }
  }

  export async function removeFromCart(req: Request, res: Response): Promise<void> {
    const { productId } = req.body;
    const userId = req.user?._id; 
  
    try {
      let cart= await CartModel.findOne({ userId });
  
      if (!cart) {
        res.status(404).send({ message: 'Cart not found for the user' });
        return;
      }
  
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
  
      if (itemIndex === -1) {
        res.status(404).send({ message: 'Product not found in the cart' });
        return;
      }
  
      cart.items.splice(itemIndex, 1);
  
      await cart.save();
      res.status(200).send({ message: 'Product removed from cart successfully'});
    } catch (error) {
      res.status(500).send({ message: 'Internal server error while processing your request!', error });
    }
  }
  
  