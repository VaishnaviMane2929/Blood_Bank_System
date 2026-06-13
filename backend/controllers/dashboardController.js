const User = require("../models/User");
const Donation = require("../models/Donation");
const Request = require("../models/Request");

const getDashboardStats = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments();

    const totalDonors = await Donation.countDocuments();

    const totalRequests = await Request.countDocuments();

    const totalBloodUnits = await Donation.aggregate([
      {
        $group: {
          _id: null,
          totalUnits: {
            $sum: "$units"
          }
        }
      }
    ]);

    res.json({
      success: true,

      totalUsers,

      totalDonors,

      totalRequests,

      totalBloodUnits:
        totalBloodUnits.length > 0
          ? totalBloodUnits[0].totalUnits
          : 0
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  getDashboardStats
};