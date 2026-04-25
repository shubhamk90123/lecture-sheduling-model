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
  profile,
  updateProfile,
} = require("../controller/adminController");
const upload = require("../utils/upload");

adminRouter.use(requireRole("admin"));

adminRouter.get("/dashboard", getDashboard);

adminRouter.get("/profile", profile);
adminRouter.post("/update-profile", updateProfile);

adminRouter.get("/add-course", getaddCourse);

adminRouter.post("/add-course", upload.single("image"), postaddCourse);

adminRouter.get("/viewInstructors", viewInstructor);

adminRouter.get("/viewCourses", allCourses);

adminRouter.get("/manageLecture", manageLec);

adminRouter.get("/sheduleLec", getSheduleLec);

adminRouter.post("/sheduleLec", postSheduleLec);

exports.adminRouter = adminRouter;
