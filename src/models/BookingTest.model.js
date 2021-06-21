const mongoose = require("mongoose");

const BookingTestSchema = new mongoose.Schema(
  {
    bookerName: {
      type: String,
    },
    ReasonForVisit: {
      type: String,
    },
    paientsName: {
      type: String,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MedicalTest",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    docId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    date: {
      type: Date,
    },
    time: {
      type: String,
    },
    bookingType: {
      type: String,
      enum: ["LAB", "DOCTOR"],
    },
    checkUpStatus: {
      type: String,
      enum: ["BOOKED", "BOOKING_FAILED", "IN_PROGRESS", "COMPLETED"],
      default: "IN_PROGRESS",
    },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "FAILED", "COMPLETED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

const BookingTest = mongoose.model("BookingTest", BookingTestSchema);

module.exports = BookingTest;
