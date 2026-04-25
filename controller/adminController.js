const User = require("../model/user");
const Course = require("../model/course");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../middleware/auth");



// My Profile
exports.profile = async (req, res) => {
  const currentUser = await User.findOne({ email: req.user?.email }).lean();
  res.render("profile", {
    role: "admin",
    pageTitle: "My Profile",
    currentUserName: req.user?.name || "Admin",
    currentUser,
    errorMessage: "",
    successMessage: ""
  });
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user?.userId);

    user.name = name;
    user.email = email;

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (isMatch) {
        user.password = await bcrypt.hash(newPassword, 10);
      }
    }

    await user.save();
    
    const token = jwt.sign({ userId: user._id, name: user.name, email: user.email, role: user.role }, JWT_SECRET);
    res.cookie("authToken", token, { httpOnly: true });

    res.render("profile", {
      role: "admin", pageTitle: "My Profile", currentUserName: user.name,
      currentUser: user.toObject(), errorMessage: "", successMessage: "Profile updated!"
    });
  } catch (error) {
    res.status(500).send("Error updating profile");
  }
};

// Admin Dashboard
exports.getDashboard = async (req, res) => {
  try {
    const instructors = await User.find({ role: "instructor" }).lean();
    const courses = await Course.find({}).lean();
    
    // Flatten lectures from all courses into a simple list
    let allLectures = [];
    courses.forEach(c => {
      if (c.lectures) {
        c.lectures.forEach(l => {
          allLectures.push({ ...l, courseName: c.name, courseCode: c.level });
        });
      }
    });

    res.render("dashboard", {
      role: "admin",
      pageTitle: "Admin Dashboard",
      currentUserName: req.user?.name || "Admin",
      instructors,
      courseData: courses,
      lectureData: allLectures,
      totalCourses: courses.length,
      totalInstructors: instructors.length,
      totalSheduleLec: allLectures.length
    });
  } catch (error) {
    res.status(500).send("Error loading dashboard");
  }
};

// Add Course
exports.getaddCourse = (req, res) => {
  res.render("admin/addCourse", {
    role: "admin",
    pageTitle: "Add Course",
    currentUserName: req.user?.name || "Admin"
  });
};

exports.postaddCourse = async (req, res) => {
  try {
    const { name, level, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    await new Course({ name, level, description, image }).save();
    res.redirect("/admin/viewCourses");
  } catch (error) {
    res.status(500).send("Error adding course");
  }
};

// View Instructors
exports.viewInstructor = async (req, res) => {
  const instructors = await User.find({ role: "instructor" }).lean();
  res.render("admin/viewInstructors", {
    role: "admin",
    pageTitle: "Instructors",
    currentUserName: req.user?.name || "Admin",
    instructors
  });
};

// View All Courses
exports.allCourses = async (req, res) => {
  const courses = await Course.find({}).lean();
  res.render("admin/allCourses", {
    role: "admin",
    pageTitle: "All Courses",
    currentUserName: req.user?.name || "Admin",
    courseData: courses
  });
};

// Manage Lectures
exports.manageLec = async (req, res) => {
  const courses = await Course.find({}).lean();
  let allLectures = [];
  courses.forEach(c => {
    c.lectures.forEach(l => allLectures.push({ ...l, courseName: c.name, courseCode: c.level }));
  });

  res.render("admin/manageLec", {
    role: "admin",
    pageTitle: "Manage Lectures",
    currentUserName: req.user?.name || "Admin",
    lectureData: allLectures
  });
};

// Schedule Lecture
exports.getSheduleLec = async (req, res) => {
  const instructors = await User.find({ role: "instructor" }).lean();
  const courses = await Course.find({}).lean();
  res.render("admin/sheduleLec", {
    role: "admin",
    pageTitle: "Schedule Lecture",
    currentUserName: req.user?.name || "Admin",
    instructors,
    courseData: courses,
    errorMessage: ""
  });
};

exports.postSheduleLec = async (req, res) => {
  try {
    const { courseName, instructor, duration, startDate } = req.body;

    // Find the instructor to get their ID
    const instructorUser = await User.findOne({ name: instructor });
    if (!instructorUser) {
      const instructors = await User.find({ role: "instructor" }).lean();
      const courses = await Course.find({}).lean();
      return res.render("admin/sheduleLec", {
        role: "admin", pageTitle: "Schedule Lecture", currentUserName: req.user?.name,
        instructors, courseData: courses, errorMessage: "Instructor not found."
      });
    }

    // Simple conflict check: find any course that has this instructor on this date
    const conflict = await Course.findOne({
      "lectures.instructorId": instructorUser._id,
      "lectures.date": startDate
    });

    if (conflict) {
      const instructors = await User.find({ role: "instructor" }).lean();
      const courses = await Course.find({}).lean();
      return res.render("admin/sheduleLec", {
        role: "admin", pageTitle: "Schedule Lecture", currentUserName: req.user?.name,
        instructors, courseData: courses, errorMessage: "Instructor is already busy on this date."
      });
    }

    // Add the lecture to the course
    await Course.updateOne(
      { name: courseName },
      { 
        $push: { 
          lectures: { 
            instructorId: instructorUser._id, 
            instructorName: instructorUser.name, 
            date: startDate, 
            duration 
          } 
        } 
      }
    );

    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error scheduling lecture");
  }
};

