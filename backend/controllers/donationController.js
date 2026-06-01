const Donation = require("../models/Donation");

const addDonation = async (req, res) => {
  try {
    const donation = await Donation.create(
      req.body
    );

    res.status(201).json({
      success: true,
      donation,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getDonations = async (req, res) => {
  try {
    const donations =
      await Donation.find();

    res.json(donations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addDonation,
  getDonations,
};