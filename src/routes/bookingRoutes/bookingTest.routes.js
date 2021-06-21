const { Router } = require("express");
const {
  bookNewTest,
  getBookedTests,
  getTestsBookedByUser,
  updateBookingTestDetails,
  deleteBookedTestById,
  getTestsBookedByDoctor,
  getTestsBookedBytest,
} = require("../../controllers/Booking/bookingTest.controller");
const { checkPermission } = require("../../middleware/checkPermission");

const router = Router();

router.post("/booknewtest", checkPermission(["USER"], "BOOKTEST"), bookNewTest);

router.get(
  "/getbookedtest",
  checkPermission(["SUPERADMIN"], "VIEWBOOKEDTEST"),
  getBookedTests
);

router.get(
  "/getbookedtest/:id",
  checkPermission(["SUPERADMIN", "DOCTOR", "LABADMIN"], "VIEWBOOKEDTEST"),
  getBookedTests
);

router.get(
  "/gettestbookedbytest/:id",
  checkPermission(["SUPERADMIN", "USER", "LABADMIN"], "VIEWBOOKEDTEST"),
  getTestsBookedBytest
);

router.get(
  "/gettestbookedbyuser/:id",
  checkPermission(["SUPERADMIN", "USER"], "VIEWBOOKEDTEST"),
  getTestsBookedByUser
);

router.get(
  "/gettestbookedbydoctor/:id",
  checkPermission(["SUPERADMIN", "USER", "DOCTOR"], "VIEWBOOKEDTEST"),
  getTestsBookedByDoctor
);

router.patch(
  "/updatebookedtest",
  checkPermission(["SUPERADMIN", "USER", "LABADMIN"], "UPDATEBOOKEDTEST"),
  updateBookingTestDetails
);

router.delete(
  "/deletebookedtest/:id",
  checkPermission(["SUPERADMIN", "USER", "LABADMIN"], "DELETEBOOKEDTEST"),
  deleteBookedTestById
);

module.exports = router;
