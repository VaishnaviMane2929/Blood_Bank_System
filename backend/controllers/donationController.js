const Donation = require("../models/Donation");

// GET ALL DONORS
const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find();

    res.json({
      success: true,
      donations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADD DONOR
const addDonation = async (req, res) => {
  try {
    const donation = await Donation.create(req.body);

    res.status(201).json({
      success: true,
      donation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE DONOR
const updateDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      donation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE DONOR
const deleteDonation = async (req, res) => {
  try {
    await Donation.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Donor Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDonations,
  addDonation,
  updateDonation,
  deleteDonation,
};