const { Router } = require("express");
const {
  register,
  login,
  updatePassword,
  sendOtp,
  verifyOtp,
  labLogin,
  checkToken,
} = require("../../controllers/Auth/auth.controller");
const { verifyToken } = require("../../middleware/verifyToken");

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/lablogin", labLogin);

router.post("/sendotp", sendOtp);

router.post("/verifyotp", verifyOtp);

router.post("/checktokenonrefresh", verifyToken(), checkToken);

router.patch("/updatepassword", verifyToken(), updatePassword);

module.exports = router;
