const mongoose = require('mongoose');

// Schema for cart items to define the structure of each item
const cartItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  imageLink: { type: String, required: true },
});

// Schema for order details, can be extended as needed
const orderDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  tableNo: { type: String, required: true },
  orderType: { type: String, enum: ['dine-in', 'takeaway'], required: true },
  location: { type: String, enum: ['main-branch', 'sub-branch', 'sub-branch2'], required: true },
});

const orderSchema = new mongoose.Schema({
  orderDetails: orderDetailsSchema, // Refined to use a nested schema
  cartItems: [cartItemSchema],      // Array of cart item objects
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'completed'], required: true, default: 'pending' },
});

// Create and export the Order model
const Order = mongoose.model('Order', orderSchema);

// Function to calculate daily revenue


module.exports = Order;
