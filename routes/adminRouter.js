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
  deleteLecture,
  getEditLecture,
  postEditLecture,
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

adminRouter.get("/delete-lecture/:courseId/:lectureId", deleteLecture);
adminRouter.get("/edit-lecture/:courseId/:lectureId", getEditLecture);
adminRouter.post("/edit-lecture/:courseId/:lectureId", postEditLecture);

exports.adminRouter = adminRouter;
