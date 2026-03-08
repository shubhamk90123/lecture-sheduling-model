//Core Module
const fs = require("fs");
const path = require("path");

const rootdir = require("../utils/path");

const filePath = path.join(__dirname, "../data/admin.json");
// const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));

//Local Module (Importing user data from page controller)
const { userData } = require("./pageController");

const courseData = [];
const courseDataPath = path.join(rootdir, "data", "courseData.json");

exports.getDashboard = (req, res) => {
  res.render("admin/dashboard", { instructors, courseData });
};

exports.postDashboard = (req, res) => {
  console.log(req.body, req.method);
  res.redirect("/admin/dashboard");
};

exports.getaddCourse = (req, res) => {
  res.render("admin/addCourse");
};

exports.postaddCourse = (req, res) => {
  const { courseName, courseCode, instructor, duration, startDate } = req.body;

  if (!courseName || !courseCode || !instructor) {
    return res.status(400).render("admin/addCourse");
  }

  courseData.push({
    courseName: courseName.trim(),
    courseCode: courseCode.trim(),
    instructor: instructor.trim(),
    duration: duration ? duration.trim() : "",
    startDate: startDate || "",
  });

  return res.redirect("/admin/viewCourses");
};

const instructors = userData.filter(
  (user) => user.role && user.role.toLowerCase() === "instructor",
);

exports.viewInstructor = (req, res) => {
  res.render("admin/viewInstructors", { instructors });
};

exports.allCourses = (req, res) => {
  res.render("admin/allCourses", { courseData });
};

exports.manageLec = (req, res) => {
  res.render("admin/manageLec");
};

exports.courseData = courseData;
