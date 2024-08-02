const mongoose = require("mongoose");

const bookingModel = mongoose.Schema({
  tourId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour",
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  streetAddress: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Booking", bookingModel);