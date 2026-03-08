//External Modules
const express = require("express");
const adminRouter = express.Router();
const { requireRole } = require("../middleware/auth");
const {
  getDashboard,
  postDashboard,
  getaddCourse,
  viewInstructor,
  allCourses,
  manageLec,
  postaddCourse,
  getSheduleLec,
  postSheduleLec,
} = require("../controller/adminController");

adminRouter.use(requireRole("admin"));

adminRouter.get("/dashboard", getDashboard);

adminRouter.get("/add-course", getaddCourse);

adminRouter.post("/add-course", postaddCourse);

adminRouter.get("/viewInstructors", viewInstructor);

adminRouter.get("/viewCourses", allCourses);

adminRouter.get("/manageLecture", manageLec);

adminRouter.get("/sheduleLec", getSheduleLec);

adminRouter.post("/sheduleLec", postSheduleLec);

exports.adminRouter = adminRouter;
