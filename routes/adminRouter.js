//External Modules
const express = require("express");
const adminRouter = express.Router();
const {
  getDashboard,
  postDashboard,
  getaddCourse,
  viewInstructor,
  allCourses,
  manageLec,
  postaddCourse,
} = require("../controller/adminController");

adminRouter.get("/dashboard", getDashboard);

adminRouter.post("/dashboard", postDashboard);

adminRouter.get("/add-course", getaddCourse);

adminRouter.post("/add-course", postaddCourse);

adminRouter.get("/viewInstructors", viewInstructor);

adminRouter.get("/viewCourses", allCourses);

adminRouter.get("/manageLecture", manageLec);

exports.adminRouter = adminRouter;
