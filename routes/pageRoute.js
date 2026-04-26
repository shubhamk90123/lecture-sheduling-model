//External Modules
const express = require("express");
const { body } = require("express-validator");
const pageRoute = express.Router();

//LOcal Modules
const {
  getLogin,
  postSignup,
  getSignup,
  postLogin,
  logout,
  rootPage,
} = require("../controller/pageController");

pageRoute.get("/", rootPage);

pageRoute.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Please enter a valid email."),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters."),
    body("name").trim().notEmpty().withMessage("Name is required."),
    body("contact").isLength({ min: 10, max: 10 }).withMessage("Contact must be exactly 10 digits."),
  ],
  postSignup
);

pageRoute.get("/signup", getSignup);

pageRoute.post("/login", postLogin);

pageRoute.get("/login", getLogin);

pageRoute.get("/logout", logout);

exports.pageRoute = pageRoute;
