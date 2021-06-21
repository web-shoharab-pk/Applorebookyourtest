const { Router } = require("express");
const {
  addMember,
  getMemberById,
  getMemberByUserId,
  updateMemberDetails,
  deleteMemberById,
} = require("../../controllers/User/member.controller");

const router = Router();

router.post("/addmember", addMember);

router.post("/getmember", getMemberById);

router.post("/getmemberbyuserid", getMemberByUserId);

router.patch("/updatemember", updateMemberDetails);

router.delete("/deletemember", deleteMemberById);

module.exports = router;
