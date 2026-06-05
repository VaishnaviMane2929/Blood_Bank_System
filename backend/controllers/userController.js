const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER USER

const registerUser = async (req, res) => {
  try {
    console.log("REGISTER DATA:", req.body);

    const {
      name,
      email,
      mobile,
      password,
      bloodGroup,
      city,
    } = req.body;

    if (
      !name ||
      !email ||
      !mobile ||
      !password ||
      !bloodGroup ||
      !city
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      bloodGroup,
      city,
    });

    const token = jwt.sign(
      { id: user._id },
      "bloodbanksecret",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      token,
      user,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// LOGIN USER

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      "bloodbanksecret",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};