const express = require('express');
const {
  addItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} = require('../Controllers/itemcontroller');
const {
  order,
  getAllOrders,
  getOrdersByLocation,
  updateOrderStatus,
  fetchOrder,  
}=require('../Controllers/ordercontroller');
const stockdata=require('../Controllers/stockcontroller')
const router = express.Router();
const {authenticate} = require('../Middleware/auth');

// Routes
router.post('/api/items', addItem); // Add a new item
router.get('/api/items', getItems); // Get all items
router.get('/api/items/:id', getItemById); // Get a single item by ID
router.put('/api/items/:id', updateItem); // Update an item
router.delete('/api/items/:id', deleteItem); // Delete an item


// Check if the handler functions are defined and correctly imported
router.post('/api/order', order);  // Ensure the 'order' function is correctly defined in ordercontroller.js
router.get('/api/order', getAllOrders);
router.get('/api/orders/location', getOrdersByLocation);
router.put('/api/order/:id', updateOrderStatus);
router.get('/api/order/:id', fetchOrder);

// Stock Data routes
router.post('/api/stock',stockdata.addStock); // Add a new stock
router.get('/api/stock', stockdata.viewStock); // View all stocks
router.patch('/api/stock/:id', stockdata.editStock); // Edit a stock
router.delete('/api/stock/:id', stockdata.deleteStock); // Delete a stock


module.exports = router;
