//External Modules
const express = require("express");
const adminRouter = express.Router();
const { requireRole } = require("../middleware/auth");
const {
  getDashboard,
  getaddCourse,
  viewInstructor,
  allCourses,
  manageLec,
  previousLec,
  postaddCourse,
  getSheduleLec,
  postSheduleLec,
  profile,
  updateProfile,
  deleteLecture,
  deleteCourse,
  getEditCourse,
  postEditCourse,
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

adminRouter.get("/previousLecture", previousLec);

adminRouter.get("/sheduleLec", getSheduleLec);

adminRouter.post("/sheduleLec", postSheduleLec);

adminRouter.post("/delete-lecture/:courseId/:lectureId", deleteLecture);
adminRouter.post("/delete-course/:id", deleteCourse);
adminRouter.get("/edit-course/:id", getEditCourse);
adminRouter.post("/edit-course/:id", upload.single("image"), postEditCourse);
adminRouter.get("/edit-lecture/:courseId/:lectureId", getEditLecture);
adminRouter.post("/edit-lecture/:courseId/:lectureId", postEditLecture);

exports.adminRouter = adminRouter;
