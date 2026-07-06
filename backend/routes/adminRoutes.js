const express = require("express");

const router = express.Router();

const authAdmin = require("../middleware/authMiddleware");

const {
  loginAdmin,
  getProfile,
  updateProfile,
} = require("../controllers/adminController");

router.post("/login", loginAdmin);

router.get("/profile", authAdmin, getProfile);

router.put("/profile", authAdmin, updateProfile);

module.exports = router;