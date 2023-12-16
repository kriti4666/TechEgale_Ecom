const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');


//ADD PRODUCTS
exports.addProduct = async (req, res) => {
  try {
    const { name, image, description, weight, quantity, price } = req.body;

    // Create a new product
    const newProduct = new Product({ name, image, description, weight, quantity, price });

    await newProduct.save();

    res.status(201).json({ message: 'Product added to inventory successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



//UPDATE PRODUCT QUANTITY
exports.updateProductQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;


    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.findByIdAndUpdate(productId, { $set: { quantity } });

    res.status(200).json({ message: 'Product quantity updated successfully' });
  } catch (error) {
    console.error('Error updating product quantity:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


//DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.findByIdAndDelete(productId);

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


//PLACE ORDER
exports.placeOrder = async (req, res) => {
  try {
    const { customerId, products } = req.body;

    const customer = await User.findById(customerId);
    console.log(customer, "cust")
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const order = new Order({ customerId, products });

    await order.save();

    res.status(201).json({ message: 'Order placed successfully', orderId: order._id });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


//UPDATE ORDER STATUS
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await Order.findByIdAndUpdate(orderId, { $set: { status } });

    res.status(200).json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
