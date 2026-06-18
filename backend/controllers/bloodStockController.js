const BloodStock = require("../models/BloodStock");

// Add Stock
const addStock = async (req, res) => {
  try {
    const stock = await BloodStock.create(req.body);

    res.status(201).json({
      success: true,
      stock,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Stock
const getStocks = async (req, res) => {
  try {
    const stocks = await BloodStock.find();

    res.json({
      success: true,
      stocks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Stock
const updateStock = async (req, res) => {
  try {
    const stock =
      await BloodStock.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json({
      success: true,
      stock,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Stock
const deleteStock = async (req, res) => {
  try {
    await BloodStock.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addStock,
  getStocks,
  updateStock,
  deleteStock,
};