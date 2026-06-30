const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

mongoose.connect(
  "mongodb://127.0.0.1:27017/bloodbank"
);

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const Admin = mongoose.model(
  "Admin",
  adminSchema
);

async function createAdmin() {
  try {
    const hash = await bcrypt.hash(
      "Admin123",
      10
    );

    console.log("HASH:", hash);

    await Admin.deleteMany({});

    await Admin.create({
      email: "admin@gmail.com",
      password: hash,
    });

    console.log(
      "Admin Created Successfully"
    );

    process.exit();
  } catch (error) {
    console.log(error);
  }
}

createAdmin();