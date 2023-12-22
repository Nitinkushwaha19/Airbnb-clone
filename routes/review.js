const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");

const {
  validateReview,
  isloggedIn,
  isReviewAuthor,
} = require("../midddlewares.js");

const reviewController = require("../controllers/reviews.js");

// Post Review Route
router.post(
  "/",
  validateReview,
  isloggedIn,
  wrapAsync(reviewController.createReview)
);

// Delete Reviews Route
router.delete(
  "/:reviewId",
  isloggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
