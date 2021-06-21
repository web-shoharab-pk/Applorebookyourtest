const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var mongoose_delete = require("mongoose-delete");

const DoctorSchema = new mongoose.Schema(
  {
    email: { type: String },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [8, "Minimum password length is 8 characters"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please enter an PhoneNumber"],
      unique: true,
      min: [1000000000, "Enter valid 10 digit phonenumber"],
      max: [9999999999, "Enter valid 10 digit phonenumber"],
    },
    name: {
      type: String,
      reqired: true,
    },
    docType: {
      type: String,
      reqired: true,
    },
    about: {
      type: String,
      reqired: true,
    },
    workingTime: {
      type: String,
      reqired: true,
    },
    patientsAttedned: {
      type: Number,
    },
    experience: {
      type: String,
    },
    address: {
      type: String,
    },
    rating: {
      type: Number,
    },
    userType: {
      type: String,
      default: "DOCTOR",
    },
    dob: {
      type: Date,
    },
    gender: { type: String },
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
        "VIEWDOCTOR",
        "UPDATEDOCTOR",
        "DELETEDOCTOR",
        "VIEWUSER",
        "VIEWLAB",
        "VIEWBOOKEDTEST",
      ],
    },
  },
  { timestamps: true }
);

DoctorSchema.plugin(mongoose_delete, {
  overrideMethods: ["find", "findOne", "findOneAndUpdate", "update"],
});

DoctorSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Doctor = mongoose.model("Doctor", DoctorSchema);

module.exports = Doctor;
