const mongoose = require("mongoose");

const MedicalTestSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    name: { type: String, required: true },
    desc: { type: String, required: true },
    procedure: { type: String, required: true },
    noOfTestbooked: { type: Number },
    noOfTestIncluded: {
      type: Number,
    },
    price: {
      type: Number,
    },
    labId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Laboratory",
      required: true,
    },
    increment: {
      type: Number,
    },
  },
  { timestamps: true }
);

const MedicalTest = mongoose.model("MedicalTest", MedicalTestSchema);

module.exports = MedicalTest;
