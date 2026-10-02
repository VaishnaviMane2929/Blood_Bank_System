const express = require("express");

const router = express.Router();

const {
  addDonation,
  getDonations,
  updateDonation,
  deleteDonation,
} = require("../controllers/donationController");

// GET all donors
router.get("/", getDonations);

// ADD donor
router.post("/", addDonation);

// UPDATE donor
router.put("/:id", updateDonation);

// DELETE donor
router.delete("/:id", deleteDonation);

module.exports = router;