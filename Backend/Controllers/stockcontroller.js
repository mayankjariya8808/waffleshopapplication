const Stock = require('../Modal/stockdata');

// Add stock data
const addStock = async (req, res) => {
  try {
    const stock = new Stock(req.body);
    await stock.save();
    res.status(201).send(stock);
  } catch (error) {
    res.status(400).send(error);
  }
};

// View stock data
const viewStock = async (req, res) => {
  try {
    const stock = await Stock.find({});
    res.status(200).send(stock);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Edit stock data
const editStock = async (req, res) => {
  try {
    const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!stock) {
      return res.status(404).send();
    }
    res.status(200).send(stock);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete stock data
const deleteStock = async (req, res) => {
  try {
    const stock = await Stock.findByIdAndDelete(req.params.id);
    if (!stock) {
      return res.status(404).send();
    }
    res.status(200).send(stock);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports={
addStock,
viewStock,
editStock,
deleteStock
}