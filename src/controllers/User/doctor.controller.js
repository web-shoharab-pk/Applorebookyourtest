const Doctor = require("../../models/doctor.model");
const logger = require("../../logger/logger");
const User = require("../../models/user.model");
const Laboratory = require("../../models/laboratory.model");

module.exports.addDoctor = [
  async (req, res) => {
    const {
      name,
      docType,
      about,
      workingTime,
      patientsAttedned,
      experience,
      address,
      labId,
      rating,
      email,
      phoneNumber,
      password,
    } = req.body;
    try {
      const Duplicate =
        (await User.findOne({ phoneNumber })) ||
        (await Laboratory.findOne({ phoneNumber })) ||
        (await Doctor.findOne({ phoneNumber }));
      if (Duplicate) {
        const error =
          "An Laboratory or Doctor or super Admin is registered with this number  ";
        return res.status(400).json({
          error: error,
          message: "Phone Number Already Exists Try With Another Number",
          status: false,
        });
      } else {
        const doctor = await Doctor.create({
          name,
          docType,
          about,
          workingTime,
          patientsAttedned,
          experience,
          address,
          rating,
          labId,
          email,
          phoneNumber,
          password,
        });
        logger.info("doctor add Controller: doctor added:" + doctor);
        res.status(201).send({
          doctor,
          status: true,
          message: "doctor created sucessfully",
        });
      }
    } catch (error) {
      logger.error(`laboratory add Controller: ${error}`);
      res
        .status(400)
        .send({ message: "can't able to add doctor", error, status: false });
    }
  },
];

module.exports.getDoctorById = [
  async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
      if (id) {
        const doctor = await Doctor.find({ _id: id }).populate("labId").exec();
        logger.info("doctor Controller: doctor Found:" + doctor);
        return res
          .status(201)
          .send({ doctor, status: true, message: "doctor found sucessfuly" });
      }
      const doctor = await Doctor.find({});
      logger.info("doctor Controller: doctor Found:" + doctor);
      res
        .status(201)
        .send({ doctor, status: true, message: "doctor found sucessfuly" });
    } catch (error) {
      logger.error(`laboratory Controller by id: ${error}`);
      res
        .status(400)
        .send({ error, status: false, message: "unable to find the doctor" });
    }
  },
];

module.exports.updateDoctorDetails = [
  async (req, res) => {
    try {
      const { id } = req.body.data;

      Doctor.findById({ _id: id })
        .then((model) => {
          return Object.assign(model, req.body.data);
        })
        .then((model) => {
          return model.save();
        })
        .then((updatedModel) => {
          res.status(201).json({
            message: "updated sucessfully",
            updatedModel,
            status: true,
          });
        })
        .catch((error) => {
          logger.error(
            `Doctor update Controller - model updated failed: ${error}`
          );
          res.status(400).json({
            message: "update failed",
            error,
            status: false,
          });
        });
    } catch (error) {
      logger.error(`Doctorupdate Controller: ${error}`);
      res.status(400).json({
        message: "update failed",
        error,
        status: false,
      });
    }
  },
];

module.exports.deleteDoctorById = [
  async (req, res) => {
    const { id } = req.params;
    try {
      Doctor.deleteOne({ _id: id })
        .exec()
        .then((result) => {
          logger.info(`Lab deleted sucessfully, id is : ${id}`);

          res.status(201).json({
            message: "deleted sucessfully",
            status: true,
          });
        })
        .catch((error) => {
          res.json({
            error,
            message: "cant able to delete the Lab",
            status: true,
          });
        });
    } catch (error) {
      logger.error(`cant able to delete the Lab: ${error}`);
      res
        .status(400)
        .send({ error, message: "can't able to delete the Lab", status: true });
    }
  },
];
