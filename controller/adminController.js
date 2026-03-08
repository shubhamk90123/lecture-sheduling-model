//Core Module
const fs = require("fs");
const path = require("path");

const rootdir = require("../utils/path");

//Local Module (Importing user data from page controller)
const { userData } = require("./pageController");

const courseDataPath = path.join(rootdir, "data", "courseData.json");
const sheduleLecDataPath = path.join(rootdir, "data", "sheduleLecData.json");

let courseData = [];
let lectureData = [];

try {
  if (fs.existsSync(courseDataPath)) {
    const raw = fs.readFileSync(courseDataPath, "utf-8");
    const parsed = raw ? JSON.parse(raw) : [];
    courseData = Array.isArray(parsed) ? parsed : [];
  }
} catch (error) {
  console.error("Failed to load course data:", error.message);
}

try {
  if (fs.existsSync(sheduleLecDataPath)) {
    const raw = fs.readFileSync(sheduleLecDataPath, "utf-8");
    const parsed = raw ? JSON.parse(raw) : [];
    lectureData = Array.isArray(parsed) ? parsed : [];
  }
} catch (error) {
  console.error("Failed to load lecture data:", error.message);
}

const getInstructors = () =>
  userData.filter(
    (user) => user.role && user.role.toLowerCase() === "instructor",
  );

exports.getDashboard = (req, res) => {
  const instructors = getInstructors();

  res.render("admin/dashboard", {
    instructors,
    courseData,
    lectureData,
    totalCourses: courseData.length,
    totalInstructors: instructors.length,
    totalSheduleLec: lectureData.length,
  });
};

exports.postDashboard = (req, res) => {
  console.log(req.body, req.method);
  res.redirect("/admin/dashboard");
};

exports.getaddCourse = (req, res) => {
  const instructors = getInstructors();
  res.render("admin/addCourse", { instructors });
};

exports.postaddCourse = (req, res) => {
  console.log(req.body, req.method);
  const { courseName, courseCode, duration, startDate } = req.body;

  if (!courseName || !courseCode || !duration) {
    return res.status(400).render("admin/addCourse");
  }

  courseData.push({
    courseName: courseName.trim(),
    courseCode: courseCode.trim(),
    duration: duration ? duration.trim() : "",
    startDate: startDate || "",
  });

  fs.writeFile(courseDataPath, JSON.stringify(courseData, null, 2), (error) => {
    if (error) {
      console.error("Failed to save course data:", error.message);
    }
  });

  return res.redirect("/admin/viewCourses");
};

exports.viewInstructor = (req, res) => {
  const instructors = getInstructors();
  res.render("admin/viewInstructors", { instructors });
};

exports.allCourses = (req, res) => {
  res.render("admin/allCourses", { courseData });
};

exports.manageLec = (req, res) => {
  res.render("admin/manageLec");
};

exports.getSheduleLec = (req, res) => {
  const instructors = getInstructors();
  res.render("admin/sheduleLec", { instructors, courseData });
};

exports.postSheduleLec = (req, res) => {
  console.log(req.body, req.method);
  const { courseName, courseCode, instructor, duration, startDate } = req.body;
  const instructors = getInstructors();

  if (
    !courseName?.trim() ||
    !courseCode?.trim() ||
    !instructor?.trim() ||
    !duration?.trim() ||
    !startDate
  ) {
    return res
      .status(400)
      .render("admin/sheduleLec", { instructors, courseData });
  }

  lectureData.push({
    courseName: courseName.trim(),
    courseCode: courseCode.trim(),
    instructor: instructor.trim(),
    duration: duration.trim(),
    startDate,
  });

  fs.writeFile(
    sheduleLecDataPath,
    JSON.stringify(lectureData, null, 2),
    (error) => {
      if (error) {
        console.error("Failed to save lecture data:", error.message);
      }
    },
  );

  return res.redirect("/admin/dashboard");
};

exports.lectureData = lectureData;
exports.courseData = courseData;
