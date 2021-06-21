const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var mongoose_delete = require("mongoose-delete");

const relationSchema = new mongoose.Schema({
  relationType: {
    type: String,
  },
  name: { type: String },
  phoneNumber: {
    type: String,
    min: [1000000000, "Enter valid 10 digit phonenumber"],
    max: [9999999999, "Enter valid 10 digit phonenumber"],
  },
  dob: {
    type: Date,
  },
  gender: { type: String },
  bloodGroup: { type: String },
});

const UserSchema = new mongoose.Schema(
  {
    email: { type: String },
    name: { type: String, reqired: true },
    phoneNumber: {
      type: String,
      required: [true, "Please enter an PhoneNumber"],
      unique: true,
      min: [1000000000, "Enter valid 10 digit phonenumber"],
      max: [9999999999, "Enter valid 10 digit phonenumber"],
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: { type: String, required: true },
    bloodGroup: { type: String },
    relation: [relationSchema],
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [8, "Minimum password length is 8 characters"],
    },
    userType: {
      type: String,
      reqired: true,
      enum: ["USER", "SUPERADMIN"],
      default: "USER",
    },
    allowedFeatures: {
      type: [
        {
          type: String,
          enum: [
            "CREATEUSER",
            "VIEWUSER",
            "UPDATEUSER",
            "DELETEUSER",
            "CREATELAB",
            "VIEWLAB",
            "UPDATELAB",
            "DELETELAB",
            "ADDMEMBER",
            "VIEWMEMBER",
            "UPDATEMEMBER",
            "DELETEMEMBER",
            "BOOKTEST",
            "VIEWBOOKEDTEST",
            "UPDATEBOOKEDTEST",
            "DELETEBOOKEDTEST",
            "CREATETEST",
            "VIEWTEST",
            "UPDATETEST",
            "DELETETEST",
            "CREATEDOCTOR",
            "VIEWDOCTOR",
            "UPDATEDOCTOR",
            "DELETEDOCTOR",
          ],
        },
      ],
      default: [
        "VIEWUSER",
        "UPDATEUSER",
        "DELETEUSER",
        "ADDMEMBER",
        "VIEWMEMBER",
        "UPDATEMEMBER",
        "DELETEMEMBER",
        "BOOKTEST",
        "VIEWBOOKEDTEST",
        "UPDATEBOOKEDTEST",
        "DELETEBOOKEDTEST",
        "VIEWLAB",
        "VIEWTEST",
        "VIEWDOCTOR",
      ],
    },
  },
  { timestamps: true }
);

UserSchema.plugin(mongoose_delete, {
  overrideMethods: ["find", "findOne", "findOneAndUpdate", "update"],
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
