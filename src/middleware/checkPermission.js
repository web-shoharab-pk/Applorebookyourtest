const logger = require("../logger/logger");
const { getUser } = require("./getUser");

module.exports.checkPermission = (permission, feature) => {
  return async (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
      logger.info("TOKEN:" + token);
      await getUser(token, (user) => {
        if (user == "INVALID_TOKEN") {
          logger.error("Authentication Error: Invalid Token");
          console.log("we are here in check permission");

          res
            .status(401)
            .json({ error: "Authentication Error: Invalid Token" });
        } else {
          logger.info("USER ALLOWED FEATURES:" + user.userType);

          if (
            user &&
            permission.includes(user.userType) &&
            user.allowedFeatures.includes(feature)
          ) {
            console.log("USER : ", user);
            console.log(
              "permission check : ",
              permission.includes(user.userType)
            );

            logger.info("Content can be accessed by:" + permission);

            console.log("PERMISSION : ", permission);
            req.user = user;
            next();
          } else {
            logger.error(
              "Forbidden: user don't have enough access to this content"
            );
            res.status(403).json({
              error: "Forbidden: you don't have enough access to this content",
            });
          }
        }
      });
    } else {
      logger.error("No Token Received " + token);
      res.status(401).json({ error: "Unauthorized Request" });
    }
  };
};
