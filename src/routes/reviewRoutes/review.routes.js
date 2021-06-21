const { Router } = require("express");
const {
  addReview,
  getReviewsBylabId,
  getReviewsByDocId,
  updateReviewDetails,
  deletereviewById,
  getreviews,
} = require("../../controllers/review/review.controller");

const router = Router();

router.post("/addreview", addReview);

router.get("/getreviews", getreviews);

router.get("/getreviews/:id", getreviews);

router.get("/getlabreviews/:id", getReviewsBylabId);

router.get("/getdocreviews/:id", getReviewsByDocId);

router.patch("/updatereviews", updateReviewDetails);

router.delete("/deletereview/:id", deletereviewById);

module.exports = router;
