const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER USER

const registerUser = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Request body is missing"
      });
    }

    const { name, email, password, bloodGroup, city } = req.body;

    // rest of code...

    // rest code
    // CHECK USER

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // HASH PASSWORD

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // CREATE USER

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      bloodGroup,
      city,
    });

    // TOKEN

    const token = jwt.sign(
      {
        id: user._id,
      },
      "bloodbanksecret",
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      token,
      user,
    });
  } catch (error) {
  console.error("REGISTER ERROR:", error);

  res.status(500).json({
    success: false,
    error: error.message,
  });
}
};


// LOGIN USER

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // FIND USER

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }

    // CHECK PASSWORD

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    // TOKEN

    const token = jwt.sign(
      {
        id: user._id,
      },
      "bloodbanksecret",
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};