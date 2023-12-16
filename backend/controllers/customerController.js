const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');


//GET INVENTORY
exports.getInventory = async (req, res) => {
  try {
    const inventory = await Product.find();
    res.status(200).json(inventory);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


//ADD TO CART
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.userId;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (quantity > product.quantity) {
      return res.status(400).json({ message: 'Not enough quantity available' });
    }

    await User.findByIdAndUpdate(userId, { $addToSet: { cart: { productId, quantity } } });

    res.status(200).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


//GET USER CART
exports.getUserCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(userId, 'userid')
    const user = await User.findById(userId).populate('cart.productId');
    res.status(200).json(user.cart);
  } catch (error) {
    console.error('Error fetching user cart:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


//UPDATE CART ITEM
exports.updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.user.userId;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (quantity > product.quantity) {
      return res.status(400).json({ message: 'Not enough quantity available' });
    }

    await User.updateOne({ _id: userId, 'cart.productId': productId }, { $set: { 'cart.$.quantity': quantity } });

    res.status(200).json({ message: 'Cart item updated successfully' });
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


//PLACE ORDER
exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).populate('cart.productId');

    if (!user.cart.length) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    const order = new Order({
      customerId: userId,
      products: user.cart.map(item => ({ productId: item.productId._id, quantity: item.quantity })),
    });

    await order.save();


    await User.findByIdAndUpdate(userId, { $set: { cart: [] } });

    res.status(201).json({ message: 'Order placed successfully', orderId: order._id });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



//TRACK ORDER
exports.trackOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Error tracking order:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
