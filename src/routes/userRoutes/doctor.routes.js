const { Router } = require("express");
const {
  addDoctor,
  getDoctorById,
  updateDoctorDetails,
  deleteDoctorById,
} = require("../../controllers/User/doctor.controller");
const { checkPermission } = require("../../middleware/checkPermission");

const router = Router();

router.post(
  "/adddoctor",
  checkPermission(["SUPERADMIN", "LABADMIN"], "CREATEDOCTOR"),
  addDoctor
);

router.get(
  "/getdoctor",
  checkPermission(["SUPERADMIN", "LABADMIN", "USER", "DOCTOR"], "VIEWDOCTOR"),
  getDoctorById
);

router.get(
  "/getdoctor/:id",
  checkPermission(["SUPERADMIN", "LABADMIN", "USER", "DOCTOR"], "VIEWDOCTOR"),
  getDoctorById
);

router.patch(
  "/updatedoctor",
  checkPermission(["SUPERADMIN", "LABADMIN", "DOCTOR"], "UPDATEDOCTOR"),
  updateDoctorDetails
);

router.delete(
  "/deletedoctor/:id",
  checkPermission(["SUPERADMIN", "LABADMIN", "DOCTOR"], "DELETEDOCTOR"),
  deleteDoctorById
);

module.exports = router;
