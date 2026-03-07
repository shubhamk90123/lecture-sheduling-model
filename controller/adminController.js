// const fs = require("fs");
// const path = require("path");

// const filePath = path.join(__dirname, "../data/admin.json");
// const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));

const courseData = [];

exports.getDashboard = (req, res) => {
  res.render("admin/dashboard");
};

exports.postDashboard = (req, res) => {
  console.log(req.body, req.method);
  res.render("admin/dashboard");
};

exports.getDashboard = (req, res) => {
  res.render("admin/dashboard");
};

exports.getaddCourse = (req, res) => {
  res.render("admin/addCourse");
};

exports.postaddCourse = (req, res) => {
  console.log(req.body);
  courseData.push(req.body);
  res.render("admin/addCourse");
  console.log(courseData);
};

exports.viewInstructor = (req, res) => {
  res.render("admin/viewInstructors");
};

exports.allCources = (req, res) => {
  res.render("admin/allCourses");
};

exports.manageLec = (req, res) => {
  res.render("admin/manageLec");
};

exports.courseData = courseData;
