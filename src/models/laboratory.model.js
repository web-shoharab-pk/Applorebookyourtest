const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var mongoose_delete = require("mongoose-delete");

const LaboratorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      reqired: true,
    },
    type: {
      type: String,
      reqired: true,
    },
    address: {
      address: {
        type: String,
      },
      coordinates: {
        longitude: { type: String },
        latitude: { type: String },
      },
    },
    about: {
      type: String,
      reqired: true,
    },
    rating: {
      type: Number,
    },
    email: { type: String },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [8, "Minimum password length is 8 characters"],
    },
    userType: {
      type: String,
      reqired: true,
      enum: ["LABADMIN"],
      default: "LABADMIN",
    },
    allowedFeatures: {
      type: [
        {
          type: String,
          enum: [
            "VIEWLAB",
            "CREATETEST",
            "VIEWTEST",
            "UPDATETEST",
            "DELETETEST",
            "CREATEDOCTOR",
            "VIEWDOCTOR",
            "UPDATEDOCTOR",
            "DELETEDOCTOR",
            "VIEWBOOKEDTEST",
            "UPDATEBOOKEDTEST",
            "DELETEBOOKEDTEST",
          ],
        },
      ],
      default: [
        "VIEWLAB",
        "CREATETEST",
        "VIEWTEST",
        "UPDATETEST",
        "DELETETEST",
        "CREATEDOCTOR",
        "VIEWDOCTOR",
        "UPDATEDOCTOR",
        "DELETEDOCTOR",
        "VIEWBOOKEDTEST",
        "UPDATEBOOKEDTEST",
        "DELETEBOOKEDTEST",
      ],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please enter an PhoneNumber"],
      unique: true,
      min: [1000000000, "Enter valid 10 digit phonenumber"],
      max: [9999999999, "Enter valid 10 digit phonenumber"],
    },
  },
  { timestamps: true }
);
LaboratorySchema.plugin(mongoose_delete, {
  overrideMethods: ["find", "findOne", "findOneAndUpdate", "update"],
});

LaboratorySchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
const Laboratory = mongoose.model("Laboratory", LaboratorySchema);

module.exports = Laboratory;
