//External Modules
const express = require("express");
const adminRouter = express.Router();
const {
  getDashboard,
  postDashboard,
  addCourse,
  viewInstructor,
  allCources,
  manageLec,
} = require("../controller/adminController");

adminRouter.get("/dashboard", getDashboard);

adminRouter.post("/dashboard", postDashboard);

adminRouter.get("/add-course", addCourse);

adminRouter.get("/viewInstructors", viewInstructor);

adminRouter.get("/viewCourses", allCources);

adminRouter.get("/manageLecture", manageLec);

exports.adminRouter = adminRouter;
