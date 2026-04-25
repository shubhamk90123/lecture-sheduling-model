//External modules
const express = require("express");
const instructorRouter = express.Router();
const { requireRole } = require("../middleware/auth");

//Local Modules
const {
  getDashboard,
  postDashboard,
  profile,
  updateProfile,
  lectures,
} = require("../controller/instructorController");

instructorRouter.use(requireRole("instructor"));

instructorRouter.get("/instructorDashboard", getDashboard);

instructorRouter.post("/instructorDashboard", postDashboard);

instructorRouter.get("/profile", profile);

instructorRouter.post("/update-profile", updateProfile);

instructorRouter.get("/lectures", lectures);

exports.instructorRouter = instructorRouter;
