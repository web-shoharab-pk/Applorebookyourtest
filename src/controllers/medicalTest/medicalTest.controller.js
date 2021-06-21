const MedicalTest = require("../../models/medicalTest.model");
const logger = require("../../logger/logger");

module.exports.addMedicalTest = [
  async (req, res) => {
    const {
      category,
      name,
      desc,
      procedure,
      noOfTestbooked,
      noOfTestIncluded,
      labId,
      increment,
      price,
    } = req.body;
    try {
      const medicalTest = await MedicalTest.create({
        category,
        name,
        desc,
        procedure,
        noOfTestbooked,
        noOfTestIncluded,
        labId,
        increment,
        price,
      });
      logger.info(
        "medicalTest add Controller: medical Test added:" + medicalTest
      );
      res.status(201).send({
        medicalTest,
        status: true,
        message: "medical test created sucessfully",
      });
    } catch (error) {
      logger.error(`medical Test added cannot be added: ${error}`);
      res.status(400).send({
        error,
        status: true,
        message: "failed to create medical test",
      });
    }
  },
];

module.exports.getMedicalTest = [
  async (req, res) => {
    const { id } = req.params;
    try {
      if (id) {
        const medicalTest = await MedicalTest.find({ _id: id })
          .populate("labId")
          .exec();
        logger.info("medicalTest Controller: medicalTest Found:" + medicalTest);
        return res.status(201).send({
          medicalTest,
          status: true,
          message: "found medical test sucessfully",
        });
      }
      const medicalTest = await MedicalTest.find({}).populate("labId").exec();
      logger.info("medicalTest Controller: medicalTest Found:" + medicalTest);
      res.status(201).send({
        medicalTest,
        status: true,
        message: "found medical test sucessfully",
      });
    } catch (error) {
      logger.error(`medicalTest Controller by id: ${error}`);
      res.status(400).send({
        error,
        status: false,
        message: "can't able find medical test",
      });
    }
  },
];

module.exports.getMedicalTestbyLabId = [
  async (req, res) => {
    const { id } = req.params;
    try {
      const medicalTest = await MedicalTest.find({ labId: id });
      logger.info("medicalTest Controller: medicalTest Found:" + medicalTest);
      return res.status(201).send({
        medicalTest,
        status: true,
        message: "found medical test sucessfully",
      });
    } catch (error) {
      logger.error(`medicalTest Controller by id: ${error}`);
      res
        .status(400)
        .send({ error, status: false, message: "cant able find medical test" });
    }
  },
];

module.exports.updateMedicalTestDetails = [
  async (req, res) => {
    try {
      const { id } = req.body.data;

      MedicalTest.findById({ _id: id })
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
            `MedicalTest update Controller - model updated failed: ${error}`
          );
          res.status(400).json({
            message: "update failed",
            error,
            status: false,
          });
        });
    } catch (error) {
      logger.error(`MedicalTest update Controller: ${error}`);
      res.status(400).json({ message: "update failed", error, status: false });
    }
  },
];

module.exports.deleteMedicalTestById = [
  async (req, res) => {
    const { id } = req.params;
    try {
      MedicalTest.deleteOne({ _id: id })
        .exec()
        .then((result) => {
          logger.info(`Test deleted sucessfully, id is : ${id}`);

          res.status(201).json({
            message: "deleted sucessfully",
            status: true,
          });
        })
        .catch((error) => {
          res.json({
            error,
            status: false,
            message: "cant able to delete medical test",
          });
        });
    } catch (error) {
      logger.error(`cant able to delete the Test: ${error}`);
      res.status(400).send({
        error,
        status: false,
        message: "cant able to delete medical test",
      });
    }
  },
];
