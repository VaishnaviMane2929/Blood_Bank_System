const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const getProfile = async (req, res) => {

  try {

    const admin = await Admin
      .findById(req.adminId)
      .select("-password");

    res.json({
      success: true,
      admin,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

const updateProfile = async (req, res) => {

  try {

    const {
      name,
      mobile,
      city,
    } = req.body;

    const admin = await Admin.findById(req.adminId);

    if (!admin) {

      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });

    }

    admin.name = name;
    admin.mobile = mobile;
    admin.city = city;

    await admin.save();

    res.json({

      success: true,

      message: "Profile Updated",

      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        mobile: admin.mobile,
        city: admin.city,
        createdAt: admin.createdAt,
      },

    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin Not Found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: admin._id,
      },
      "bloodbanksecret",
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Success",
      token,
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role || "Administrator",
      },
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  loginAdmin,
  getProfile,
  updateProfile,
};