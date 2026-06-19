const User = require("../models/User");
const Donation = require("../models/Donation");
const Request = require("../models/Request");
const BloodStock = require("../models/BloodStock");

const getReports = async (req, res) => {
  try {
    const totalUsers =
      await User.countDocuments();

    const totalDonors =
      await Donation.countDocuments();

    const totalRequests =
      await Request.countDocuments();

    const stock =
      await BloodStock.find();

    const donations =
      await Donation.find()
        .sort({ createdAt: -1 })
        .limit(5);

    const bloodGroups = stock.map(
      (item) => ({
        group: item.bloodGroup,
        units: item.units,
      })
    );

    const monthlyRequests = [
      {
        month: "Jan",
        requests: totalRequests,
      },
      {
        month: "Feb",
        requests: totalRequests,
      },
      {
        month: "Mar",
        requests: totalRequests,
      },
      {
        month: "Apr",
        requests: totalRequests,
      },
      {
        month: "May",
        requests: totalRequests,
      },
    ];

    res.json({
      success: true,

      totalUsers,
      totalDonors,
      totalRequests,

      bloodGroups,
      monthlyRequests,

      recentDonations:
        donations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

module.exports = {
  getReports,
};