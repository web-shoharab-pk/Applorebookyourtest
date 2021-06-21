const logger = require("../logger/logger");
const { SECRETE_KEY } = require("../config/Keys");
const jwt = require("jsonwebtoken");

module.exports.verifyToken = () => {
  return async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      logger.error("No Token Received " + token);
      return res.status(401).json({ error: "Unauthorized Request" });
    }

    try {
      const user = await jwt.verify(token.split(" ")[1], SECRETE_KEY);
      logger.info("Content can be accessed by:" + user.id);
      req.user = user;
      next();
    } catch (error) {
      res.status(400).json({ error: "Authentication Error: Invalid Token" });
    }
  };
};
