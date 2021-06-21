const User = require("../../models/user.model");
const logger = require("../../logger/logger");

module.exports.getUser = [
  async (req, res) => {
    try {
      if (req.params.id) {
        const user = await User.findById({ _id: req.params.id });
        logger.info("User Controller: user Found:" + user);
        return res.status(201).send({
          user,
          status: true,
          message: "user found succesfully",
        });
      }

      const user = await User.find();
      logger.info("User Controller: user Found:" + user);
      res.status(201).send({
        user,
        status: true,
        message: "user found succesfully",
      });
    } catch (error) {
      logger.error(`User Controller: ${error}`);
      res
        .status(400)
        .send({ message: "cant able to get user", error, status: false });
    }
  },
];

module.exports.addMember = [
  async (req, res) => {
    const { id } = req.body;
    try {
      await User.findOneAndUpdate(
        { _id: id },
        {
          $push: {
            relation: req.body,
          },
        },
        { new: true }
      ).then((user) => {
        res.status(200).json({
          message: "member created sucessfully",
          user,
          status: true,
        });
      });
    } catch (error) {
      logger.error(`User: creating member Controller: ${error}`);
      res
        .status(400)
        .json({ message: "failed to add a member", error, status: false });
    }
  },
];

module.exports.updateMember = [
  async (req, res) => {
    const { id, rId } = req.body.data;
    try {
      await User.updateOne(
        { _id: id, "relation._id": rId },
        { $set: { "relation.$": req.body.data } }
      ).then((result) => {
        res
          .status(200)
          .json({ message: "updated sucessfully", result, status: true });
      });
    } catch (error) {
      logger.error(`User delete member Controller: ${error}`);
      res.status(400).json({ message: "update failed", error, status: false });
    }
  },
];

module.exports.deleteMember = [
  async (req, res) => {
    const { id, rId } = req.body;
    try {
      await User.findByIdAndUpdate(
        { _id: id },
        {
          $pull: {
            relation: { _id: rId },
          },
        },
        { new: true }
      ).then((user) => {
        res
          .status(200)
          .json({ message: "member deleted sucessfully", user, status: true });
      });
    } catch (error) {
      logger.error(`User delete member Controller: ${error}`);
      res.status(400).json({ message: "update failed", error, status: false });
    }
  },
];

module.exports.updateUserDetails = [
  async (req, res) => {
    try {
      User.findById({ _id: req.body.data.id })
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
            `User update Controller - model updated failed: ${error}`
          );
          res.status(400).json({
            message: "update failed",
            error,
            status: false,
          });
        });
    } catch (error) {
      logger.error(`User update Controller: ${error}`);
      res.status(400).json({ message: "update failed", error, status: false });
    }
  },
];

module.exports.deleteUserById = [
  async (req, res) => {
    try {
      User.deleteOne({ _id: req.params.id })
        .exec()
        .then((result) => {
          logger.info(`user delete sucessfully id is : ${req.params.id}`);

          res.status(201).json({
            message: "deleted sucessfully",
            status: true,
          });
        })
        .catch((error) => {
          res.json({
            error,
            message: "cant able to delete",
            status: false,
          });
        });
    } catch (error) {
      logger.error(`cant able to delete the user: ${error}`);
      res
        .status(400)
        .send({ error, message: "cant able to delete", status: false });
    }
  },
];
