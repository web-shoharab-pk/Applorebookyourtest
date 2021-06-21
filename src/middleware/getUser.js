const logger = require("../logger/logger");
const { SECRETE_KEY } = require("../config/Keys");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Doctor = require("../models/doctor.model");
const Laboratory = require("../models/laboratory.model");

module.exports.getUser = async (token, next) => {
  token = token.replace("Bearer ", "");
  jwt.verify(token, SECRETE_KEY, async (err, user) => {
    if (err) {
      logger.error("GET_USER_TOKEN_ERROR:" + err);
      next("INVALID_TOKEN");
    } else {
      console.log(user);
      if (user.userType == "SUPERADMIN") {
        User.findById(user.id, function (err, userData) {
          if (err || userData == null) {
            logger.error("GET_USER_DB_NOT USER_FOUND_ERROR:" + err);

            next("INVALID_TOKEN");
          } else {
            next(userData);
          }
        });
      } else if (user.userType == "USER") {
        User.findById(user.id, function (err, userData) {
          if (err || userData == null) {
            logger.error("GET_USER_DB_NOT USER_FOUND_ERROR:" + err);
            next("INVALID_TOKEN");
          } else {
            next(userData);
          }
        });
      } else if (user.userType == "DOCTOR") {
        Doctor.findById(user.id, function (err, userData) {
          if (err || userData == null) {
            logger.error("GET_USER_DB_NOT USER_FOUND_ERROR:" + err);
            next("INVALID_TOKEN");
          } else {
            next(userData);
          }
        });
      } else if (user.userType == "LABADMIN") {
        Laboratory.findById(user.id, function (err, userData) {
          if (err || userData == null) {
            logger.error("GET_USER_DB_NOT USER_FOUND_ERROR:" + err);
            next("INVALID_TOKEN");
          } else {
            next(userData);
          }
        });
      } else {
        logger.error("GET_USER_DB_NOT USER_FOUND_ERROR:" + err);
        next("INVALID_TOKEN");
      }
    }
  });
};
