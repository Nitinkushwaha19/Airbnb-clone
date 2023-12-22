const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isloggedIn, isOwner, validateListing } = require("../midddlewares.js");
const listingController = require("../controllers/listings.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage }); //dest --> destination or folder

// const upload = multer({ dest: 'uploads/' })  //dest --> destination or folder in the pc

// Index and Create Route --->
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isloggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

// New Route --->
router.get("/new", isloggedIn, listingController.renderNewForm);

// edit Route --->
router.get(
  "/:id/edit",
  isloggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

// Show , Update and Delete Route --->
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put( isloggedIn,isOwner, upload.single("listing[image]"),validateListing, wrapAsync(listingController.updateListing))
  .delete(isloggedIn, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;
