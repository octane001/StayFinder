const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
//  SignUp
router
  .route("/signup")
  .get((req, res) => {
    res.render("./user/signup.ejs");
  })
  .post(upload.single("user[image]"), wrapAsync(userController.signup));

//  Login
router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      // Middleware For authentication for user
      failureRedirect: "/login",
      failureFlash: true,
    }), // for login purpose
    userController.login
  );

// Logout
router.get("/logout", userController.logout);

module.exports = router;
