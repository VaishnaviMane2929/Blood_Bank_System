const express = require("express");

const router = express.Router();

const {
  addStock,
  getStocks,
  updateStock,
  deleteStock,
} = require("../controllers/bloodStockController");

router.post("/", addStock);

router.get("/", getStocks);

router.put("/:id", updateStock);

router.delete("/:id", deleteStock);

module.exports = router;