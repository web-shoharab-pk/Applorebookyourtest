const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["DOCTOR", "LAB"],
    },
    rating: {
      type: Number,
      reqired: true,
    },
    reason: {
      type: String,
      reqired: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    labId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Laboratory",
    },
    docId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
