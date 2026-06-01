const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
    },

    bloodGroup: {
      type: String,
      required: true,
    },

    unitsRequired: {
      type: Number,
      required: true,
    },

    hospital: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    contact: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Request",
  requestSchema
);