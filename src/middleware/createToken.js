const jwt = require("jsonwebtoken");
const { TOKEN_MAX_AGE, SECRETE_KEY } = require("../config/Keys");

module.exports.createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      userType: user.userType,
      allowedFeatures: user.allowedFeatures,
    },
    SECRETE_KEY,
    {
      expiresIn: TOKEN_MAX_AGE,
    }
  );
};
