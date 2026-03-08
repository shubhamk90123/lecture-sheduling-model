//External Modules
const express = require("express");
const pageRoute = express.Router();

//LOcal Modules
const {
  getLogin,
  postSignup,
  getSignup,
  postLogin,
  logout,
} = require("../controller/pageController");

pageRoute.post("/signup", postSignup);

pageRoute.get("/signup", getSignup);

pageRoute.post("/login", postLogin);

pageRoute.get("/login", getLogin);

pageRoute.get("/logout", logout);

exports.pageRoute = pageRoute;
