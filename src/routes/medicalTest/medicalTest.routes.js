const { Router } = require("express");
const {
  addMedicalTest,
  getMedicalTest,
  deleteMedicalTestById,
  updateMedicalTestDetails,
  getMedicalTestbyLabId,
} = require("../../controllers/medicalTest/medicalTest.controller");
const { checkPermission } = require("../../middleware/checkPermission");

const router = Router();

router.post(
  "/addMedicalTest",
  checkPermission(["SUPERADMIN", "LABADMIN"], "CREATETEST"),
  addMedicalTest
);

router.get(
  "/getMedicalTest/:id",
  checkPermission(["SUPERADMIN", "LABADMIN"], "VIEWTEST"),
  getMedicalTest
);

router.get(
  "/getMedicalTest",
  checkPermission(["SUPERADMIN"], "VIEWTEST"),
  getMedicalTest
);

router.get(
  "/getMedicaltestbylab/:id",
  checkPermission(["SUPERADMIN", "LABADMIN"], "VIEWTEST"),
  getMedicalTestbyLabId
);

router.patch(
  "/updateMedicalTest",
  checkPermission(["SUPERADMIN", "LABADMIN"], "UPDATETEST"),
  updateMedicalTestDetails
);

router.delete(
  "/deleteMedicalTest/:id",
  checkPermission(["SUPERADMIN", "LABADMIN"], "DELETETEST"),
  deleteMedicalTestById
);

module.exports = router;
