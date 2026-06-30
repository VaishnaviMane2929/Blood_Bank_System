const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

mongoose.connect(
  "mongodb://127.0.0.1:27017/bloodbank"
);

const AdminSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const Admin = mongoose.model(
  "Admin",
  AdminSchema
);

async function createAdmin() {
  const hash = await bcrypt.hash(
    "Admin123",
    10
  );

  console.log(hash);

  await Admin.create({
    email: "admin@gmail.com",
    password: hash,
  });

  console.log("Admin Created");
  process.exit();
}

createAdmin();