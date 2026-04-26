//Core Modules
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Local Modules
const User = require("../model/user");
const Course = require("../model/course");
const { JWT_SECRET } = require("../middleware/auth");

// Instructor Dashboard
exports.getDashboard = async (req, res) => {
  try {
    const currentUserName = req.user?.name || "User";
    const instructors = await User.find({ role: "instructor" }).lean();
    
    // Find lectures for this instructor
    const courses = await Course.find({ "lectures.instructorName": currentUserName }).lean();
    let assignedLectures = [];
    courses.forEach(c => {
      c.lectures.forEach(l => {
        if (l.instructorName === currentUserName) {
          assignedLectures.push({ ...l, courseName: c.name, courseCode: c.level });
        }
      });
    });

    const now = new Date();
    const upcoming = assignedLectures.filter(l => new Date(l.date) >= now).length;
    const past = assignedLectures.filter(l => new Date(l.date) < now).length;

    res.render("dashboard", {
      role: "instructor",
      pageTitle: "Instructor Dashboard",
      currentUserName,
      instructors,
      lectureData: assignedLectures,
      totalCourses: assignedLectures.length,
      upcomingLectures: upcoming,
      pastLectures: past,
      totalSheduleLec: assignedLectures.length
    });
  } catch (error) {
    res.status(500).send("Error loading dashboard");
  }
};

exports.postDashboard = async (req, res) => {
  res.redirect("/instructor/instructorDashboard");
};

// My Profile
exports.profile = async (req, res) => {
  const currentUser = await User.findOne({ email: req.user?.email }).lean();
  res.render("profile", {
    role: "instructor",
    pageTitle: "My Profile",
    currentUserName: req.user?.name || "User",
    currentUser,
    errorMessage: "",
    successMessage: ""
  });
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, specialization, phone, currentPassword, newPassword, confirmNewPassword } = req.body;
    const user = await User.findById(req.user?.userId);

    // Basic validation
    if (!name || !email) {
      return res.render("profile", { 
        role: "instructor", pageTitle: "My Profile", currentUserName: req.user?.name, 
        currentUser: user, errorMessage: "Name and email are required.", successMessage: "" 
      });
    }

    // Update basic info
    user.name = name;
    user.email = email;
    user.specialization = specialization;
    user.contact = phone;

    // Optional password update
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.render("profile", { 
          role: "instructor", pageTitle: "My Profile", currentUserName: req.user?.name, 
          currentUser: user, errorMessage: "Current password incorrect.", successMessage: "" 
        });
      }
      if (newPassword !== confirmNewPassword) {
        return res.render("profile", { 
          role: "instructor", pageTitle: "My Profile", currentUserName: req.user?.name, 
          currentUser: user, errorMessage: "Passwords do not match.", successMessage: "" 
        });
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();

    // Refresh token
    const token = jwt.sign({ userId: user._id, name: user.name, email: user.email, role: user.role }, JWT_SECRET);
    res.cookie("authToken", token, { httpOnly: true });

    res.render("profile", {
      role: "instructor", pageTitle: "My Profile", currentUserName: user.name,
      currentUser: user.toObject(), errorMessage: "", successMessage: "Profile updated!"
    });
  } catch (error) {
    res.status(500).send("Error updating profile");
  }
};

// My Lectures
exports.lectures = async (req, res) => {
  const name = req.user?.name;
  const courses = await Course.find({ "lectures.instructorName": name }).lean();
  let myLecs = [];
  courses.forEach(c => {
    c.lectures.forEach(l => {
      if (l.instructorName === name) myLecs.push({ ...l, courseName: c.name, courseCode: c.level });
    });
  });

  res.render("instructor/myLectures", {
    role: "instructor",
    pageTitle: "My Lectures",
    currentUserName: name,
    lectureData: myLecs
  });
};
