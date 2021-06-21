const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema(
  {
    name: { type: String, reqired: true },
    relation: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: [true, "Please enter an PhoneNumber"],
      unique: true,
      min: [1000000000, "Enter valid 10 digit phonenumber"],
      max: [9999999999, "Enter valid 10 digit phonenumber"],
    },
    dob: {
      type: Date,
    },
    gender: { type: String },
    bloodGroup: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Member = mongoose.model("Member", MemberSchema);

module.exports = Member;
