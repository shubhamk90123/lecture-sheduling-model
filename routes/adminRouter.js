//External Modules
const express = require("express");
const adminRouter = express.Router();

adminRouter.post("/dashboard", (req, res) => {
  console.log(req.body, req.method);
  res.render("admin/dashboard");
});

adminRouter.get("/add-course", (req, res) => {
  res.render("admin/addCourse");
});

adminRouter.get("/viewInstructors", (req, res) => {
  res.render("admin/viewInstructors");
});

adminRouter.get("/viewCourses", (req, res) => {
  res.render("admin/allCourses");
});

exports.adminRouter = adminRouter;
