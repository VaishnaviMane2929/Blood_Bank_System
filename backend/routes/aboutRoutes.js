const express = require("express");

const router = express.Router();

const {
  getAbout,
  updateAbout,
} = require("../controllers/aboutController");

// Get About page data
router.get("/", getAbout);

// Update About page data
router.put("/", updateAbout);

module.exports = router;