const express = require("express");

const router = express.Router();

const {
  addStock,
  getStocks,
  updateStock,
  deleteStock,
} = require("../controllers/bloodStockController");

// Get all blood stock
router.get("/", getStocks);

// Add blood stock
router.post("/", addStock);

// Update blood stock
router.put("/:id", updateStock);

// Delete blood stock
router.delete("/:id", deleteStock);

module.exports = router;