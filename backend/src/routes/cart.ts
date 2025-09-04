import express from 'express';
import { protect } from '../middleware/auth';
import User, { IUser } from '../models/User';
import Product, { IProduct } from '../models/Product';

const router = express.Router();

// Get user's cart
router.get('/', protect, async (req: any, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add to cart
router.post('/:productId', protect, async (req: any, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const productId = product._id as unknown as string;
    
    if (user.cart.some(item => item.toString() === productId.toString())) {
      return res.status(400).json({ message: 'Product already in cart' });
    }

    user.cart.push(product._id);
    await user.save();

    res.status(201).json({ message: 'Product added to cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove from cart
router.delete('/:productId', protect, async (req: any, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.cart = user.cart.filter(
      (itemId) => itemId.toString() !== req.params.productId
    );
    await user.save();

    res.json({ message: 'Product removed from cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
