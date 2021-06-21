const Review = require("../../models/review.model");
const logger = require("../../logger/logger");

module.exports.addReview = [
  async (req, res) => {
    const { category, rating, reason, userId, labId, docId } = req.body;
    try {
      const review = await Review.create({
        category,
        rating,
        reason,
        userId,
        labId,
        docId,
      });
      logger.info("review add Controller: review Test added:" + review);
      res
        .status(201)
        .send({ review, status: true, message: "create sucessfully" });
    } catch (error) {
      logger.error(`review Test added cannot be added: ${error}`);
      res
        .status(400)
        .send({ message: "review is not added", error, status: false });
    }
  },
];

module.exports.getreviews = [
  async (req, res) => {
    const { id } = req.params;
    try {
      if (id) {
        const review = await Review.find({ _id: id });
        logger.info("review Controller: BookingTest Found:" + bookingTest);
        return res.status(201).send({
          review,
          message: "sent booked test sucessfully",
          status: true,
        });
      }
      const review = await Review.find({});
      logger.info("review Controller: BookingTest Found:" + bookingTest);
      res.status(201).send({
        review,
        message: "sent booked test sucessfully",
        status: true,
      });
    } catch (error) {
      logger.error(`review Controller by id: ${error}`);
      res.status(400).send({
        message: "NO test found some error thrown",
        error,
        status: false,
      });
    }
  },
];

module.exports.getReviewsBylabId = [
  async (req, res) => {
    const { id } = req.params;
    try {
      const review = await Review.find({ labId: id });

      if (review.length !== 0) {
        logger.info("review Controller: review Found:" + review);
        return res
          .status(201)
          .send({ review, status: true, message: "found sucessfully" });
      }
      logger.info("review Controller: reviews not Found:" + review);
      throw Error("reviews not Found");
    } catch (error) {
      logger.error(`review Controller by id: ${error}`);
      res
        .status(400)
        .send({ message: "Cannot find the reviews", error, status: false });
    }
  },
];

module.exports.getReviewsByDocId = [
  async (req, res) => {
    const { id } = req.params;
    try {
      const review = await Review.find({ docId: id });

      if (review.length !== 0) {
        logger.info("review Controller: review Found:" + review);
        return res
          .status(201)
          .send({ review, status: true, message: "Found sucessfully" });
      }
      logger.info("review Controller: reviews not Found:" + review);
      throw Error("reviews not Found");
    } catch (error) {
      logger.error(
        `review Controller cannot find review by id:${id}, error is: ${error}`
      );
      res.status(400).send({
        message: "Cannot find the reviews",
        error,
        status: false,
      });
    }
  },
];

module.exports.updateReviewDetails = [
  async (req, res) => {
    try {
      const { id } = req.body.data;

      Review.findById({ _id: id })
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
            `Review update Controller -Review updated failed: ${err}`
          );
          res.status(400).json({
            message: "model updated failed",
            error,
            status: false,
          });
        });
    } catch (error) {
      logger.error(`Review update Controller: ${error}`);
      res
        .status(400)
        .json({ message: "model updated failed", error, status: false });
    }
  },
];

module.exports.deletereviewById = [
  async (req, res) => {
    const { id } = req.params;
    try {
      Review.deleteOne({ _id: id })
        .exec()
        .then((result) => {
          logger.info(`review deleted sucessfully, id is : ${id}`);

          res.status(201).json({
            message: "deleted sucessfully",
            status: true,
          });
        })
        .catch((error) => {
          res.json({
            message: "cant able to delete the review",
            error,
            status: false,
          });
        });
    } catch (error) {
      logger.error(`cant able to delete the review: ${error}`);
      res.status(400).send({
        message: "cant able to delete the review",
        error,
        status: false,
      });
    }
  },
];
