

//External modules
const express = require("express");
const instructorRouter = express.Router();

//Local Modules
const {
  getDashboard,
  postDashboard,
  profile,
  updateProfile,
  lectures,
} = require("../controller/instructorContolller");


instructorRouter.get("/dashboard", getDashboard);

instructorRouter.post("/dashboard", postDashboard);

instructorRouter.get("/profile", profile);

instructorRouter.post("/update-profile", updateProfile);

instructorRouter.get("/lectures", lectures);

exports.instructorRouter = instructorRouter;
