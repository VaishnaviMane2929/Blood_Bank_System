const Request = require("../models/Request");

// ADD REQUEST
const addRequest = async (req, res) => {
  try {
    console.log("BLOOD REQUEST DATA:", req.body);

    const {
      patientName,
      bloodGroup,
      unitsRequired,
      hospital,
      city,
      contact,
    } = req.body;

    // ==========================================
    // REQUIRED FIELD VALIDATION
    // ==========================================

    if (
      !patientName ||
      !bloodGroup ||
      !unitsRequired ||
      !hospital ||
      !city ||
      !contact
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ==========================================
    // UNITS VALIDATION
    // ==========================================

    if (Number(unitsRequired) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Required units must be greater than 0",
      });
    }

    // ==========================================
    // CONTACT VALIDATION
    // ==========================================

    if (!/^[0-9]{10}$/.test(contact)) {
      return res.status(400).json({
        success: false,
        message: "Contact number must contain 10 digits",
      });
    }

    // ==========================================
    // CREATE REQUEST
    // ==========================================

    const request = await Request.create({
      patientName: patientName.trim(),
      bloodGroup: bloodGroup.trim().toUpperCase(),
      unitsRequired: Number(unitsRequired),
      hospital: hospital.trim(),
      city: city.trim(),
      contact: contact.trim(),
    });

    // ==========================================
    // RESPONSE
    // ==========================================

    res.status(201).json({
      success: true,
      message: "Blood request submitted successfully",
      request,
    });

  } catch (error) {
    console.error(
      "ADD BLOOD REQUEST ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL REQUESTS
const getRequests = async (req, res) => {
  try {
    const requests = await Request.find();

    res.json({
      success: true,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE REQUEST
const updateRequest = async (req, res) => {
  try {
    const request =
      await Request.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json({
      success: true,
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE REQUEST
const deleteRequest = async (req, res) => {
  try {
    await Request.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addRequest,
  getRequests,
  updateRequest,
  deleteRequest,
};