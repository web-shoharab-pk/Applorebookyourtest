const Laboratory = require("../../models/laboratory.model");
const logger = require("../../logger/logger");
const User = require("../../models/user.model");
const Doctor = require("../../models/doctor.model");

module.exports.addLaboratory = [
  async (req, res) => {
    const {
      name,
      type,
      address,
      about,
      rating,
      email,
      userType,
      allowedFeatures,
      password,
      phoneNumber,
    } = req.body;

    console.log("vdfvfdgvefgerger", req.body);

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
        const laboratory = await Laboratory.create({
          name,
          type,
          about,
          rating,
          address: {
            address: address.address,
            coordinates: {
              longitude: address.coordinates.longitude,
              latitude: address.coordinates.latitude,
            },
          },
          userType,
          allowedFeatures,
          email,
          password,
          phoneNumber,
        });
        logger.info(
          "laboratory add Controller: laboratory added:" + laboratory
        );
        res.status(201).send({
          laboratory,
          status: true,
          message: "Laboratory created",
        });
      }
    } catch (error) {
      logger.error(`laboratory add Controller: ${error}`);
      res.status(400).send({
        error,
        status: false,
        message: "failed creating laboratory",
      });
    }
  },
];

module.exports.getLaboratoryById = [
  async (req, res) => {
    const { id } = req.params;
    try {
      if (id) {
        const laboratory = await Laboratory.find({ _id: id });
        logger.info("laboratory Controller: laboratory Found:" + laboratory);
        return res.status(201).send({
          laboratory,
          status: true,
          message: "laboratory found sucessfully",
        });
      }
      const laboratory = await Laboratory.find({});
      logger.info("laboratory Controller: laboratory Found:" + laboratory);
      res.status(201).send({
        laboratory,
        status: true,
        message: "laboratory found sucessfully",
      });
    } catch (error) {
      logger.error(`laboratory Controller by id: ${error}`);
      res.status(400).send({
        error,
        status: false,
        message: "cannot find the laboratory",
      });
    }
  },
];

module.exports.updateLaboratoryDetails = [
  async (req, res) => {
    try {
      const { id } = req.body.data;

      console.log(req.body.data);

      Laboratory.findById({ _id: id })
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
            `Laboratory update Controller - model updated failed: ${error}`
          );
          res.status(400).json({
            message: "update failed",
            error,
            status: false,
          });
        });
    } catch (error) {
      logger.error(`Lab update Controller: ${error}`);
      res.status(400).json({ message: "update failed", error, status: false });
    }
  },
];

module.exports.deleteLabById = [
  async (req, res) => {
    const { id } = req.params;

    console.log("vdfvfdgvefgerger", req.params);

    try {
      Laboratory.deleteOne({ _id: id })
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
            status: false,
            message: "cannot able to delete",
          });
        });
    } catch (error) {
      logger.error(`cant able to delete the Lab: ${error}`);
      res
        .status(400)
        .send({ error, status: false, message: "cannot able to delete" });
    }
  },
];
