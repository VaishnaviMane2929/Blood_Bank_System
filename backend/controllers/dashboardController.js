const User = require("../models/User");
const Donation = require("../models/Donation");
const Request = require("../models/Request");

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDonors = await Donation.countDocuments();
    const totalRequests = await Request.countDocuments();

    const totalUnits = await Donation.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$units" }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      totalUsers,
      totalDonors,
      totalRequests,
      totalUnits:
        totalUnits.length > 0
          ? totalUnits[0].total
          : 0,
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