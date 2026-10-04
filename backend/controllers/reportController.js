const User = require("../models/User");
const Donation = require("../models/Donation");
const Request = require("../models/Request");
const BloodStock = require("../models/BloodStock");

// ==========================================
// GET REPORTS
// ==========================================
const getReports = async (req, res) => {
  try {
    // ------------------------------------------
    // TOTAL COUNTS
    // ------------------------------------------

    const totalUsers = await User.countDocuments();

    const totalDonors = await Donation.countDocuments();

    const totalRequests = await Request.countDocuments();

    // ------------------------------------------
    // BLOOD GROUP DISTRIBUTION
    // ------------------------------------------

    const bloodStock = await BloodStock.find();

    const bloodGroupMap = {};

    bloodStock.forEach((item) => {
      const group = String(item.bloodGroup)
        .trim()
        .toUpperCase();

      if (!bloodGroupMap[group]) {
        bloodGroupMap[group] = 0;
      }

      bloodGroupMap[group] += Number(item.units || 0);
    });

    const bloodGroups = Object.entries(
      bloodGroupMap
    ).map(([group, units]) => ({
      group,
      units,
    }));

    // ------------------------------------------
    // MONTHLY REQUESTS
    // ------------------------------------------

    const requests = await Request.find()
      .sort({ createdAt: 1 });

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyRequestMap = {};

    requests.forEach((request) => {
      if (!request.createdAt) {
        return;
      }

      const date = new Date(request.createdAt);

      const month = date.getMonth();

      const year = date.getFullYear();

      const key = `${year}-${month}`;

      if (!monthlyRequestMap[key]) {
        monthlyRequestMap[key] = {
          month,
          year,
          requests: 0,
        };
      }

      monthlyRequestMap[key].requests += 1;
    });

    const monthlyRequests = Object.values(
      monthlyRequestMap
    )
      .sort((a, b) => {
        if (a.year !== b.year) {
          return a.year - b.year;
        }

        return a.month - b.month;
      })
      .map((item) => ({
        month: `${monthNames[item.month]} ${item.year}`,
        requests: item.requests,
      }));

    // ------------------------------------------
    // RECENT DONATIONS
    // ------------------------------------------

    const recentDonations =
      await Donation.find()
        .sort({ createdAt: -1 })
        .limit(10);

    // ------------------------------------------
    // RESPONSE
    // ------------------------------------------

    res.status(200).json({
      success: true,

      report: {
        totalUsers,
        totalDonors,
        totalRequests,
        bloodGroups,
        monthlyRequests,
        recentDonations,
      },
    });
  } catch (error) {
    console.error(
      "GET REPORTS ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,

      report: {
        totalUsers: 0,
        totalDonors: 0,
        totalRequests: 0,
        bloodGroups: [],
        monthlyRequests: [],
        recentDonations: [],
      },
    });
  }
};

module.exports = {
  getReports,
};