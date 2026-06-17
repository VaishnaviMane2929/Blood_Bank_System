const User = require("../models/User");
const Donation = require("../models/Donation");
const Request = require("../models/Request");
const BloodStock = require("../models/BloodStock");

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers =
      await User.countDocuments();

    const totalDonors =
      await Donation.countDocuments();

    const totalRequests =
      await Request.countDocuments();

    const stock =
      await BloodStock.find();

    const totalUnits = stock.reduce(
      (total, item) =>
        total + item.units,
      0
    );

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalDonors,
        totalRequests,
        totalUnits,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};