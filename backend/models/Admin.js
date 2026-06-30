const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "Administrator",
  },
});

module.exports = mongoose.model("Admin", adminSchema);