const express = require("express");

const router = express.Router();

const {
  addContact,
  getContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

// Add contact message
router.post("/", addContact);

// Get all contact messages
router.get("/", getContacts);

// Update contact message
router.put("/:id", updateContact);

// Delete contact message
router.delete("/:id", deleteContact);

module.exports = router;