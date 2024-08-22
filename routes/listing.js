const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {
  isLoggedIn,
  isOwner,
  validateListing,
  profilePic,
  validateSearch,
} = require("../middleware.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listings.js");

//Index Route // Create Route
router
  .route("/listings")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    profilePic,
    wrapAsync(listingController.createListing)
  );

// New Form Render on screen
router.get("/new", isLoggedIn, listingController.rendernewForm);

//Show Route // Update Route // Delete Route
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destoryListing));

// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);
// Search Router
router
  .route("/search")
  .post(validateSearch, wrapAsync(listingController.searchListings));
module.exports = router;
