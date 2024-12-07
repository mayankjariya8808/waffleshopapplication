const mongoose = require('mongoose');

const stockDataSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  billAmount: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('StockData', stockDataSchema);