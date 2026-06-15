const Donation = require("../models/Donation");

// Add Donor
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

// Get All Donors
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

// Update Donor
const updateDonation = async (req, res) => {
  try {
    const donation =
      await Donation.findByIdAndUpdate(
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

// Delete Donor
const deleteDonation = async (req, res) => {
  try {
    await Donation.findByIdAndDelete(
      req.params.id
    );

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
  addDonation,
  getDonations,
  updateDonation,
  deleteDonation,
};