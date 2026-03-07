//External Modules
const express = require("express");
const adminRouter = express.Router();
const {
  getDashboard,
  postDashboard,
  getaddCourse,
  viewInstructor,
  allCources,
  manageLec,
  postaddCourse,
} = require("../controller/adminController");

adminRouter.get("/dashboard", getDashboard);

adminRouter.post("/dashboard", postDashboard);

adminRouter.get("/add-course", getaddCourse);

adminRouter.get("/add-course", postaddCourse);

adminRouter.get("/viewInstructors", viewInstructor);

adminRouter.get("/viewCourses", allCources);

adminRouter.get("/manageLecture", manageLec);

exports.adminRouter = adminRouter;
