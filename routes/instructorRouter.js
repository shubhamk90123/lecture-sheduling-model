//core modules
const path = require("path");

//External modules
const express = require("express");
const {
  getDashboard,
  postDashboard,
  profile,
  updateProfile,
  lectures,
} = require("../controller/instructorContolller");
const instructorRouter = express.Router();

instructorRouter.get("/dashboard", getDashboard);

instructorRouter.post("/dashboard", postDashboard);

instructorRouter.get("/profile", profile);

instructorRouter.post("/update-profile", updateProfile);

instructorRouter.get("/lectures", lectures);

exports.instructorRouter = instructorRouter;
