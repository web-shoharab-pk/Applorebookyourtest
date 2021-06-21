const { Router } = require("express");
const {
  getUser,
  updateUserDetails,
  deleteUserById,
  updateMember,
  addMember,
  deleteMember,
} = require("../../controllers/User/user.controller");
const { checkPermission } = require("../../middleware/checkPermission");

const router = Router();

router.get("/getuser", checkPermission(["SUPERADMIN"], "VIEWUSER"), getUser);

router.get(
  "/getuser/:id",
  checkPermission(["SUPERADMIN", "USER"], "VIEWUSER"),
  getUser
);

router.patch(
  "/updateuser",
  checkPermission(["SUPERADMIN", "USER"], "UPDATEUSER"),
  updateUserDetails
);

router.post("/addrelation", checkPermission(["USER"], "ADDMEMBER"), addMember);

router.patch(
  "/updaterelation",
  checkPermission(["USER"], "UPDATEMEMBER"),
  updateMember
);

router.delete(
  "/deleterelation",
  checkPermission(["USER"], "DELETEMEMBER"),
  deleteMember
);

router.delete(
  "/deleteuser/:id",
  checkPermission(["SUPERADMIN", "USER"], "DELETEUSER"),
  deleteUserById
);

module.exports = router;
