const { Router } = require("express");
const {
  getLaboratoryById,
  addLaboratory,
  deleteLabById,
  updateLaboratoryDetails,
} = require("../../controllers/Laboratory/laboratory.controller");
const { checkPermission } = require("../../middleware/checkPermission");

const router = Router();

router.post(
  "/addlaboratory",
  checkPermission(["SUPERADMIN"], "CREATELAB"),
  addLaboratory
);

router.get(
  "/getlaboratory/:id",
  checkPermission(["SUPERADMIN", "USER", "LABADMIN"], "VIEWLAB"),
  getLaboratoryById
);

router.get(
  "/getlaboratory",
  checkPermission(["SUPERADMIN", "LABADMIN", "USER"], "VIEWLAB"),
  getLaboratoryById
);

router.patch(
  "/updatelaboratory",
  checkPermission(["SUPERADMIN", "LABADMIN"], "UPDATELAB"),
  updateLaboratoryDetails
);

router.delete(
  "/deletelaboratory/:id",
  checkPermission(["SUPERADMIN", "LABADMIN"], "DELETELAB"),
  deleteLabById
);

module.exports = router;
