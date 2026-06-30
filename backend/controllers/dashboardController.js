const User = require("../models/User");
const Donation = require("../models/Donation");
const Request = require("../models/Request");
const BloodStock = require("../models/BloodStock");

const getDashboardStats = async (
  req,
  res
) => {
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
      (sum, item) => sum + item.units,
      0
    );

    // const recentDonations =
    //   await Donation.find()
    //     .sort({
    //       createdAt: -1,
    //     })
    //     .limit(5);

    // const recentRequests =
    //   await Request.find()
    //     .sort({
    //       createdAt: -1,
    //     })
    //     .limit(5);

    const recentDonors = await Donation
  .find()
  .sort({ createdAt: -1 })
  .limit(5);

const recentRequests = await Request
  .find()
  .sort({ createdAt: -1 })
  .limit(5);



    const lowStock =
      await BloodStock.find({
        units: { $lt: 10 },
      });

    res.json({
      success: true,

      stats: {
        totalUsers,
        totalDonors,
        totalRequests,
        totalUnits,
      },

      bloodStock: stock,

      recentDonors,

      recentRequests,

      lowStock,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};