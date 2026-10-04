const Contact = require("../models/Contact");

// ==========================================
// ADD CONTACT MESSAGE
// ==========================================
const addContact = async (req, res) => {
  try {
    console.log("CONTACT DATA:", req.body);

    const {
      name,
      email,
      phone,
      subject,
      message,
    } = req.body;

    // ==========================================
    // REQUIRED FIELD VALIDATION
    // ==========================================

    if (
      !name ||
      !email ||
      !phone ||
      !subject ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ==========================================
    // EMAIL VALIDATION
    // ==========================================

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // ==========================================
    // PHONE VALIDATION
    // ==========================================

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message:
          "Phone number must contain exactly 10 digits",
      });
    }

    // ==========================================
    // MESSAGE VALIDATION
    // ==========================================

    if (message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message:
          "Message must contain at least 10 characters",
      });
    }

    // ==========================================
    // CREATE CONTACT
    // ==========================================

    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    // ==========================================
    // SUCCESS RESPONSE
    // ==========================================

    res.status(201).json({
      success: true,
      message:
        "Your message has been sent successfully.",
      contact,
    });
  } catch (error) {
    console.error(
      "ADD CONTACT ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to send your message.",
    });
  }
};

// ==========================================
// GET ALL CONTACT MESSAGES
// ==========================================
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      contacts,
    });
  } catch (error) {
    console.error(
      "GET CONTACTS ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// UPDATE CONTACT STATUS
// ==========================================
const updateContact = async (req, res) => {
  try {
    const contact =
      await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Contact message updated successfully",
      contact,
    });
  } catch (error) {
    console.error(
      "UPDATE CONTACT ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// DELETE CONTACT MESSAGE
// ==========================================
const deleteContact = async (req, res) => {
  try {
    const contact =
      await Contact.findByIdAndDelete(
        req.params.id
      );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Contact message deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE CONTACT ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addContact,
  getContacts,
  updateContact,
  deleteContact,
};