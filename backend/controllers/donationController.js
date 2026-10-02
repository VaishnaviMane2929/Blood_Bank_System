const Donation = require("../models/Donation");

// ==========================================
// ADD DONOR
// ==========================================
const addDonation = async (req, res) => {
  try {
    console.log("DONATION DATA:", req.body);

    const {
      donorName,
      bloodGroup,
      units,
      city,
      contact,
    } = req.body;

    // Validation
    if (
      !donorName ||
      !bloodGroup ||
      !units ||
      !city ||
      !contact
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate units
    if (Number(units) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Units must be greater than 0",
      });
    }

    // Validate contact
    if (!/^[0-9]{10}$/.test(contact)) {
      return res.status(400).json({
        success: false,
        message: "Contact number must contain 10 digits",
      });
    }

    // Create donor
    const donation = await Donation.create({
      donorName: donorName.trim(),
      bloodGroup: bloodGroup.trim().toUpperCase(),
      units: Number(units),
      city: city.trim(),
      contact: contact.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Donor registered successfully",
      donation,
    });

  } catch (error) {
    console.error("ADD DONATION ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================================
// GET ALL DONORS
// ==========================================
const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      donations,
    });
  } catch (error) {
    console.error("GET DONATIONS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================================
// UPDATE DONOR
// ==========================================
const updateDonation = async (req, res) => {
  try {
    const {
      donorName,
      bloodGroup,
      units,
      city,
      contact,
    } = req.body;

    const donation =
      await Donation.findByIdAndUpdate(
        req.params.id,
        {
          donorName,
          bloodGroup,
          units: Number(units),
          city,
          contact,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Donor updated successfully",
      donation,
    });

  } catch (error) {
    console.error("UPDATE DONATION ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================================
// DELETE DONOR
// ==========================================
const deleteDonation = async (req, res) => {
  try {
    const donation =
      await Donation.findByIdAndDelete(
        req.params.id
      );

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Donor deleted successfully",
    });

  } catch (error) {
    console.error("DELETE DONATION ERROR:", error);

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