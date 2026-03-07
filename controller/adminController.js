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

exports.viewInstructor = (req, res) => {
  res.render("admin/viewInstructors");
};

exports.allCourses = (req, res) => {
  res.render("admin/allCourses", { courseData });
};

exports.manageLec = (req, res) => {
  res.render("admin/manageLec");
};

exports.courseData = courseData;
