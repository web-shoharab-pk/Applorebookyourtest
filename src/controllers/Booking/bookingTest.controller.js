const BookingTest = require("../../models/BookingTest.model");
const logger = require("../../logger/logger");

module.exports.bookNewTest = [
  async (req, res) => {
    const {
      bookerName,
      ReasonForVisit,
      paientsName,
      age,
      gender,
      testId,
      userId,
      date,
      time,
      checkUpStatus,
      docId,
      paymentStatus,
      bookingType,
    } = req.body;
    try {
      const bookingTest = await BookingTest.create({
        bookerName,
        ReasonForVisit,
        paientsName,
        age,
        gender,
        testId,
        userId,
        date,
        time,
        checkUpStatus,
        docId,
        paymentStatus,
        bookingType,
      });
      logger.info(
        "BookingTest add Controller: BookingTest added:" + bookingTest
      );
      res.status(201).send({
        booked: bookingTest,
        status: true,
        message: "Booked sucessfully",
      });
    } catch (error) {
      logger.error(`BookingTest add Controller: ${error}`);
      res.status(400).send({
        message: "Booking failed for some reason",
        error,
        status: false,
      });
    }
  },
];

module.exports.getBookedTests = [
  async (req, res) => {
    const { id } = req.params;
    try {
      if (id) {
        const bookingTest = await BookingTest.find({ _id: id });
        logger.info("BookingTest Controller: BookingTest Found:" + bookingTest);
        return res.status(201).send({
          BookedTest: bookingTest,
          message: "sent booked test sucessfully",
          status: true,
        });
      }
      const bookingTest = await BookingTest.find({});
      logger.info("BookingTest Controller: BookingTest Found:" + bookingTest);
      res.status(201).send({
        bookedTest: bookingTest,
        message: "sent booked test sucessfully",
        status: true,
      });
    } catch (error) {
      logger.error(`BookingTest Controller by id: ${error}`);
      res.status(400).send({
        message: "NO test found some error thrown",
        error,
        status: false,
      });
    }
  },
];

module.exports.getTestsBookedBytest = [
  async (req, res) => {
    const { id } = req.params;

    try {
      const bookingTest = await BookingTest.find({ testId: id });
      logger.info("BookingTest Controller: BookingTest Found:" + bookingTest);
      res.status(201).send({
        BookedTest: bookingTest,
        message: "sent booked test by user sucessfully",
        status: true,
      });
    } catch (error) {
      logger.error(`BookingTest Controller by id: ${error}`);
      res.status(400).send({
        error,
        message: "Cannot find the test booked by user",
        status: false,
      });
    }
  },
];

module.exports.getTestsBookedByUser = [
  async (req, res) => {
    const { id } = req.params;

    try {
      const bookingTest = await BookingTest.find({ userId: id });
      logger.info("BookingTest Controller: BookingTest Found:" + bookingTest);
      res.status(201).send({
        BookedTest: bookingTest,
        message: "sent booked test by user sucessfully",
        status: true,
      });
    } catch (error) {
      logger.error(`BookingTest Controller by id: ${error}`);
      res.status(400).send({
        error,
        message: "Cannot find the test booked by user",
        status: false,
      });
    }
  },
];

module.exports.getTestsBookedByDoctor = [
  async (req, res) => {
    const { id } = req.params;

    try {
      const bookingTest = await BookingTest.find({ docId: id });
      logger.info("BookingTest Controller: BookingTest Found:" + bookingTest);
      res.status(201).send({
        BookedTest: bookingTest,
        message: "sent booked test by user sucessfully",
        status: true,
      });
    } catch (error) {
      logger.error(`BookingTest Controller by id: ${error}`);
      res.status(400).send({
        error,
        message: "Cannot find the test booked by user",
        status: false,
      });
    }
  },
];

module.exports.updateBookingTestDetails = [
  async (req, res) => {
    try {
      const { id } = req.body.data;

      BookingTest.findById({ _id: id })
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
            `BookingTest update Controller - model updated failed: ${err}`
          );
          res.status(400).json({
            message: "updated failed",
            error,
            status: false,
          });
        });
    } catch (error) {
      logger.error(`BookingTest update Controller: ${error}`);
      res.status(400).json({ error, status: false, message: "updated failed" });
    }
  },
];

module.exports.deleteBookedTestById = [
  async (req, res) => {
    const { id } = req.params;
    try {
      BookingTest.deleteOne({ _id: id })
        .exec()
        .then((result) => {
          logger.info(`BookedTest deleted sucessfully, id is : ${id}`);

          res.status(201).json({
            message: "deleted sucessfully",
            status: true,
          });
        })
        .catch((error) => {
          res.json({
            error,
            status: false,
            message: "can't able to delete the booked test",
          });
        });
    } catch (error) {
      logger.error(`can't able to delete the BookedTest: ${error}`);
      res.status(400).send({
        error,
        status: false,
        message: "can't able to delete the booked test",
      });
    }
  },
];
