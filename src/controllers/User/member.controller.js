const Member = require("../../models/members.model");
const logger = require("../../logger/logger");

module.exports.addMember = [
  async (req, res) => {
    const { phoneNumber, relation, name, dob, gender, bloodGroup, userId } =
      req.body;
    try {
      const member = await Member.create({
        phoneNumber,
        name,
        relation,
        dob,
        gender,
        bloodGroup,
        userId,
      });
      logger.info("Member add Controller: Member added:" + member);
      res
        .status(201)
        .send({ member, status: true, message: "created sucessfully" });
    } catch (error) {
      logger.error(`member add Controller: ${error}`);
      res
        .status(400)
        .send({ message: "cannot be added ", error, status: false });
    }
  },
];

module.exports.getMemberById = [
  async (req, res) => {
    const { id } = req.body;

    try {
      if (id) {
        const member = await Member.find({ userId: id });
        logger.info("Member Controller: Member Found:" + member);
        return res
          .status(201)
          .send({ member, status: true, message: "found sucessfully" });
      }
      const member = await Member.find({});
      logger.info("Member Controller: Member Found:" + member);
      res
        .status(201)
        .send({ member, status: true, message: "found sucessfully" });
    } catch (error) {
      logger.error(`member Controller by id: ${error}`);
      res
        .status(400)
        .send({ message: "member cannot be added", error, status: false });
    }
  },
];

module.exports.getMemberByUserId = [
  async (req, res) => {
    const { id } = req.body;

    try {
      const member = await Member.find({ userId: id });
      logger.info("Member Controller: Member Found:" + member);
      return res
        .status(201)
        .send({ member, status: true, message: "found sucessfully" });
    } catch (error) {
      logger.error(`member Controller by id: ${error}`);
      res
        .status(400)
        .send({ message: "member is not found", error, status: false });
    }
  },
];

module.exports.updateMemberDetails = [
  async (req, res) => {
    try {
      const { id } = req.body.data;

      Member.findById({ _id: id })
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
            `Member update Controller - model updated failed: ${err}`
          );
          res.status(400).json({
            message: "update failed",
            error,
            status: false,
          });
        });
    } catch (error) {
      logger.error(`Memberupdate Controller: ${error}`);
      res.status(400).json({ message: "update failed", error, status: false });
    }
  },
];

module.exports.deleteMemberById = [
  async (req, res) => {
    const { id } = req.body;
    try {
      Member.deleteOne({ _id: id })
        .exec()
        .then((result) => {
          logger.info(`member deleted sucessfully, id is : ${id}`);

          res.status(201).json({
            message: "deleted sucessfully",
            status: true,
          });
        })
        .catch((error) => {
          res.json({
            error,
            status: false,
            message: "cannot able delete the member",
          });
        });
    } catch (error) {
      logger.error(`cant able to delete the member: ${error}`);
      res.status(400).send({
        message: "cannot able delete the member",
        error,
        status: false,
      });
    }
  },
];
