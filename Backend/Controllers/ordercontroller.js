const OrderData = require('../Modal/OrderData');

// Place a new order
const order = async (req, res) => {
  try {
    const { orderDetails, cartItems, totalPrice } = req.body;

    const newOrder = new OrderData({
      orderDetails,
      cartItems,
      totalPrice,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Error placing order' });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderData.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

// Fetch orders based on location
const getOrdersByLocation = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Define location mapping based on username and password
    const locationMap = {
      'univercity@wow.com': { password: 'wow123', location: 'main-branch' },
      'kalawad@wow.com': { password: 'wow123', location: 'sub-branch' },
      'racecourse@wow.com': { password: 'wow123', location: 'sub-branch2' },
    };

    const user = locationMap[username];
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Fetch orders specific to the user's location
    const orders = await OrderData.find({ 'orderDetails.location': user.location });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders by location:', error);
    res.status(500).json({ error: 'Error fetching orders by location' });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await OrderData.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Error updating order status' });
  }
};

// Fetch single order by ID
const fetchOrder = async (req, res) => {
  try {
    const order = await OrderData.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  order,
  getAllOrders,
  getOrdersByLocation,
  updateOrderStatus,
  fetchOrder,
};
