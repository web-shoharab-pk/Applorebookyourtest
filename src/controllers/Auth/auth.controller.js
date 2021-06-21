const User = require("../../models/user.model");
const Laboratory = require("../../models/laboratory.model");
const logger = require("../../logger/logger");
const { body, validationResult } = require("express-validator");
const moment = require("moment");
const { createToken } = require("../../middleware/createToken");
var bcrypt = require("bcryptjs");
const Doctor = require("../../models/doctor.model");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")('AC53e89fdad869bb697ebba47ba847e642', '83f579bbb59e3da04252b964c2e05acb');

module.exports.register = [
  body("name").not().isEmpty(),
  body("phoneNumber").not().isEmpty(),
  body("dob").not().isEmpty(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 Characters"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        status: false,
        message: "check the all the input fields",
      });
    }

    const {
      name,
      phoneNumber,
      dob,
      gender,
      bloodGroup,
      password,
      relation,
      userType,
      allowedFeatures,
      email,
    } = req.body;

    var a = moment();
    var b = moment(dob, "MM-DD-YYYY");
    var age = moment.duration(a.diff(b));

    if (age.years() < 18) {
      logger.error(
        "REGISTER: Age limit for user " + phoneNumber + "rejected registration"
      );

      res.status(400).json({
        message: "Only User Above 18 years are allowed",
        status: false,
      });
    } else {
      try {
        const Duplicate =
          (await User.findOne({ phoneNumber })) ||
          (await Laboratory.findOne({ phoneNumber })) ||
          (await Doctor.findOne({ phoneNumber })) ||
          (await User.findOne({ email })) ||
          (await Laboratory.findOne({ email })) ||
          (await Doctor.findOne({ email }));
        if (Duplicate) {
          const error =
            "An Laboratory or Doctor or super Admin is registered with this number  1";
          return res.status(400).json({
            error: error,
            message: "Phone Number Already Exists Try With Another Number",
            status: false,
          });
        } else {
          const user = await User.create({
            name,
            phoneNumber,
            dob,
            gender,
            bloodGroup,
            password,
            relation,
            userType,
            allowedFeatures,
            email,
          });

          const token = await createToken(user);

          logger.info("REGISTER: User Created:" + user);
          logger.info("REGISTER: Token Created:" + token);
          res.status(201).json({
            message: "Succesfully Registered",
            token,
            status: true,
            user,
          });
        }
      } catch (err) {
        logger.error("REGISTER: " + err);
        let error = err.message;
        if (err.code == 11000) {
          error = "Phone Number already exists";
        }
        res
          .status(400)
          .json({ error, status: false, message: "failed to register" });
      }
    }
  },
];

module.exports.login = [
  // body("userName")
  //   .not()
  //   .isEmpty()
  //   .withMessage(
  //     "phoneNumber or if its a email then enter (email) Field is required"
  //   ),
  // body("password")
  //   .isLength({ min: 8 })
  //   .withMessage("Password must be atleast 8 Characters"),

  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({
    //     error: errors.array(),
    //     status: false,
    //     message: "login failed",
    //   });
    // }

    const { userName, password } = req.body;

    console.log(userName, password);

    try {
      const user =
        (await User.findOne({ phoneNumber: userName })) ||
        (await Laboratory.findOne({ phoneNumber: userName })) ||
        (await Doctor.findOne({ phoneNumber: userName })) ||
        (await User.findOne({ email: userName })) ||
        (await Laboratory.findOne({ email: userName })) ||
        (await Doctor.findOne({ email: userName }));

      if (user) {
        logger.info("LOGIN: User FOUND:" + user);
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
          logger.info("Login: User validated ");
          const token = await createToken(user);
          res.status(200).json({
            message: "Succesfully Logged In",
            token,
            status: true,
            user,
          });
        } else {
          logger.info("LOGIN: wrong password:" + user);
          throw Error("Incorrect Password");
        }
      } else {
        logger.info("User Not  found");
        throw Error("User Not Found");
      }
    } catch (err) {
      logger.error(err);
      let error = err.message;
      res.status(400).json({ error, status: false, message: "login failed" });
    }
  },
];

module.exports.labLogin = [
  body("email").isString(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 Characters"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        status: false,
        message: "login failed",
      });
    }

    const { email, password } = req.body;

    try {
      const lab = await Laboratory.findOne({ email });

      if (lab) {
        logger.info("LOGIN: lab FOUND:" + lab);
        const auth = await bcrypt.compare(password, lab.password);
        if (auth) {
          logger.info("Login: lab validated ");
          const token = await createToken(lab);
          res
            .status(200)
            .json({ message: "Succesfully Logged In", token, status: true });
        } else {
          logger.info("LOGIN: wrong password:" + lab);
          throw Error("Incorrect Password");
        }
      } else {
        logger.info("lab Not  found");
        throw Error("lab Not Found");
      }
    } catch (err) {
      logger.error(err);
      let error = err.message;
      res.status(400).json({ error, status: false, message: "login failed" });
    }
  },
];

module.exports.updatePassword = [
  body("phoneNumber")
    .not()
    .isEmpty()
    .withMessage("phoneNumber Field is required"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        status: false,
        message: "update failed",
      });
    }
    try {
      let { phoneNumber, password } = req.body;

      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(password, salt);

      logger.info("REQUESTED TO RESET PASSWORD: " + phoneNumber);
      const user = await User.findOne({ phoneNumber });

      if (user) {
        const updatePassword = await User.findByIdAndUpdate(
          { _id: user._id },
          { password: password },
          { new: true }
        );
        if (updatePassword) {
          return res.status(200).json({
            message: "Password Updated Successfully",
            data: updatePassword,
            status: true,
          });
        }
        res
          .status(400)
          .json({ message: "Something Went Wrong..!", status: false });
      } else {
        res.status(400).json({
          message: "User Not Found In Our Database",
          status: false,
        });
      }
    } catch (err) {
      logger.error(err);
      let error = err.message;
      res.status(400).json({
        error,
        message: "update failed",
        status: false,
      });
    }
  },
];

module.exports.sendOtp = [
  body("phoneNumber")
    .not()
    .isEmpty()
    .withMessage("phoneNumber Field is required"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        status: false,
        message: "check the phone number",
      });
    }
    try {
      const { phoneNumber } = req.body;

      if (phoneNumber.length != 10) {
        throw Error("Enter Valid Phone Number");
      } else {
        logger.info("REQUESTED TORESET PASSWORD: " + phoneNumber);

        client.verify.services
          .create({ friendlyName: "Book your test" })
          .then((service) => {
            logger.info(service.sid);

            var contact = "+91" + phoneNumber;

            console.log("CONTACT : ", contact);
            logger.info("Contact number" + contact);

            client.verify
              .services(service.sid)
              .verifications.create({ to: contact, channel: "sms" })
              .then((verification) => {
                logger.info("verification code" + verification.status);

                res.status(200).json({
                  message: "Otp Sent Successfully",
                  sId: service.sid,
                  status: true,
                });
              })
              .catch((error) => {
                logger.error(error);
                res.status(400).json({
                  message: "Could'nt Send Otp",
                  error,
                  status: false,
                });
              });
          })
          .catch((error) => {
            logger.error(error);
            res
              .status(400)
              .json({ message: "Could'nt Send Otp", error, status: false });
          });
      }
    } catch (error) {
      logger.error(error);
      res
        .status(400)
        .json({ message: "cant able to sent otp", error, status: false });
    }
  },
];

module.exports.verifyOtp = [
  body("phoneNumber")
    .not()
    .isEmpty()
    .withMessage("phoneNumber Feild is required"),
  body("otpValue").not().isEmpty().withMessage("otpValue Feild is required"),
  body("sId").not().isEmpty().withMessage("sId Field is required"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        status: false,
        message: "check the input fields",
      });
    }
    try {
      let { phoneNumber, otpValue, sId } = req.body;
      if (phoneNumber.length != 10) {
        throw Error("Enter Valid Phone Number");
      } else {
        logger.info("VERIFY OTP: " + phoneNumber);
        const user = await User.find({ phoneNumber: phoneNumber });

        phoneNumber = "+91" + phoneNumber;

        logger.info("Phone Number:" + phoneNumber);
        logger.info("OTP VALUE:" + otpValue);
        logger.info("SID:" + sId);

        client.verify
          .services(sId)
          .verificationChecks.create({ to: phoneNumber, code: otpValue })
          .then(async (verification_check) => {
            logger.info(verification_check);
            logger.info(verification_check.status);

            if (verification_check.status == "approved") {
              logger.info("Otp Verified");

              if (user) {
                return res.json({
                  message: "Otp Verified Successfully",
                  status: true,
                });
              } else {
                return res.json({
                  message: "Otp Verified Successfully",
                  status: true,
                });
              }
            } else {
              logger.error("Invalid Otp:" + verification_check.status);
              return res.status(400).json({
                message: "Invalid Mobile Otp Value",
                status: false,
              });
            }
          })
          .catch((error) => {
            logger.error(error);
            res.status(400).json({
              message: "Something went wrong Try again",
              status: false,
              error,
            });
          });
      }
    } catch (error) {
      logger.error(error);
      res.status(400).json({
        error,
        status: false,
        message: "Something went wrong Try again",
      });
    }
  },
];

module.exports.checkToken = [
  async (req, res) => {
    try {
      if (req.user) {
        return res.status(200).json({
          message: "Token verified",
          status: true,
          user: req.user,
        });
      } else {
        throw new Error("req.user is not found");
      }
    } catch (error) {
      res.status(200).json({
        message: "Token not verified",
        status: false,
        error,
      });
    }
  },
];
