const About = require("../models/About");

// ==========================================
// GET ABOUT DATA
// ==========================================
const getAbout = async (req, res) => {
  try {
    let about = await About.findOne();

    // Create default About data if database is empty
    if (!about) {
      about = await About.create({
        title: "About BloodConnect",

        subtitle:
          "Connecting blood donors with people who need blood.",

        description:
          "BloodConnect is a Blood Bank Management System designed to make blood donation and blood request management simple, secure, and accessible. The platform helps donors register their donations, allows patients to submit blood requests, and provides administrators with tools to manage blood stock, donors, requests, users, and campaigns.",

        mission:
          "Our mission is to simplify blood donation management and help connect available blood resources with patients in need through a reliable digital platform.",

        vision:
          "Our vision is to build a connected and transparent blood donation ecosystem where people can quickly find blood availability and contribute to saving lives.",

        features: [
          {
            title: "Donor Management",
            description:
              "Register and manage blood donors with their blood group, city, contact information, and donation details.",
          },
          {
            title: "Blood Requests",
            description:
              "Patients and hospitals can submit blood requests with required blood group, units, hospital, and contact information.",
          },
          {
            title: "Blood Stock",
            description:
              "Maintain and monitor blood inventory by blood group and available units.",
          },
          {
            title: "Secure Authentication",
            description:
              "Role-based authentication helps separate user and administrator access.",
          },
          {
            title: "Admin Management",
            description:
              "Administrators can manage donors, requests, blood stock, users, campaigns, and reports from one dashboard.",
          },
          {
            title: "Responsive Platform",
            description:
              "The application is designed to provide a smooth experience across desktop, tablet, and mobile devices.",
          },
        ],

        process: [
          {
            step: 1,
            title: "Register as a Donor",
            description:
              "Create your donor information and provide your blood group and contact details.",
          },
          {
            step: 2,
            title: "Donate Blood",
            description:
              "Donate blood through a blood bank, hospital, or organized blood donation campaign.",
          },
          {
            step: 3,
            title: "Blood Stock Updated",
            description:
              "Available blood units can be recorded and managed in the blood stock system.",
          },
          {
            step: 4,
            title: "Request Blood",
            description:
              "Patients or hospitals can submit a blood request based on their requirement.",
          },
          {
            step: 5,
            title: "Connect & Save Lives",
            description:
              "Available blood information helps connect resources with people who need them.",
          },
        ],
      });
    }

    res.status(200).json({
      success: true,
      about,
    });
  } catch (error) {
    console.error("GET ABOUT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// UPDATE ABOUT DATA
// ==========================================
const updateAbout = async (req, res) => {
  try {
    let about = await About.findOne();

    if (!about) {
      about = await About.create(req.body);
    } else {
      about = await About.findByIdAndUpdate(
        about._id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
    }

    res.status(200).json({
      success: true,
      message: "About information updated successfully",
      about,
    });
  } catch (error) {
    console.error("UPDATE ABOUT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAbout,
  updateAbout,
};