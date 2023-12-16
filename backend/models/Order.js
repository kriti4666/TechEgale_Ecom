const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }],
    status: { type: String, enum: ['Processing', 'Shipped', 'Delivered'], default: 'Processing' },
});

module.exports = mongoose.model('Order', orderSchema);
