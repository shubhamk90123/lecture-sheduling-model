//Core Modules
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

//Local Modules
const { lectureData, courseData } = require("./adminController");
const { userData } = require("./pageController");
const rootdir = require("../utils/path");
const { JWT_SECRET } = require("../middleware/auth");

const userDataPath = path.join(rootdir, "data", "user.json");

const hashPassword = (password) =>
  crypto.createHash("sha256").update(password).digest("hex");

const createAuthCookie = (token) => {
  const maxAge = 7 * 24 * 60 * 60;
  return `authToken=${encodeURIComponent(token)}; Path=/; HttpOnly; Max-Age=${maxAge}; SameSite=Lax`;
};

const getInstructors = () =>
  userData.filter(
    (user) => user.role && user.role.toLowerCase() === "instructor",
  );

const getAssignedLectures = (currentUserName = "") => {
  const normalizedName = (currentUserName || "").trim().toLowerCase();

  if (!normalizedName) {
    return [];
  }

  return lectureData.filter(
    (lec) =>
      lec.instructor &&
      lec.instructor.trim().toLowerCase() === normalizedName,
  );
};

const getDashboardData = (currentUserName = "User") => {
  const instructors = getInstructors();
  const assignedLectures = getAssignedLectures(currentUserName);

  return {
    currentUserName,
    instructors,
    courseData,
    lectureData: assignedLectures,
    totalCourses: assignedLectures.length,
    totalInstructors: instructors.length,
    totalSheduleLec: assignedLectures.length,
  };
};

//Instructor Dashboard
exports.getDashboard = (req, res) => {
  const currentUserName = req.user?.name || "User";
  res.render(
    "instructor/instructorDashboard",
    getDashboardData(currentUserName),
  );
};

exports.postDashboard = (req, res) => {
  console.log(req.body, req.method);
  const currentUserName = req.user?.name || "User";
  res.render(
    "instructor/instructorDashboard",
    getDashboardData(currentUserName),
  );
};

//My Profile ----------------------------------------------------------------------------------------------------------------
exports.profile = (req, res) => {
  const loggedInEmail = req.user?.email?.toLowerCase() || "";
  const currentUser = userData.find(
    (user) => user.email && user.email.toLowerCase() === loggedInEmail,
  );

  res.render("instructor/myProfile", {
    currentUser: currentUser || null,
    errorMessage: "",
    successMessage: "",
  });
};

exports.updateProfile = (req, res) => {
  const loggedInEmail = req.user?.email?.toLowerCase() || "";
  const currentUserIndex = userData.findIndex(
    (user) => user.email && user.email.toLowerCase() === loggedInEmail,
  );

  if (currentUserIndex === -1) {
    return res.status(404).render("instructor/myProfile", {
      currentUser: null,
      errorMessage: "User not found.",
      successMessage: "",
    });
  }

  const {
    name,
    email,
    specialization,
    phone,
    currentPassword,
    newPassword,
    confirmNewPassword,
  } = req.body;

  if (!name?.trim() || !email?.trim() || !phone?.trim()) {
    return res.status(400).render("instructor/myProfile", {
      currentUser: userData[currentUserIndex],
      errorMessage: "Name, email and phone are required.",
      successMessage: "",
    });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const emailTaken = userData.some(
    (user, idx) =>
      idx !== currentUserIndex &&
      user.email &&
      user.email.toLowerCase() === normalizedEmail,
  );

  if (emailTaken) {
    return res.status(409).render("instructor/myProfile", {
      currentUser: userData[currentUserIndex],
      errorMessage: "Email is already used by another account.",
      successMessage: "",
    });
  }

  userData[currentUserIndex].name = name.trim();
  userData[currentUserIndex].email = normalizedEmail;
  userData[currentUserIndex].specialization = specialization
    ? specialization.trim()
    : "";
  userData[currentUserIndex].contact = phone.trim();
  let passwordUpdated = false;

  if (newPassword || confirmNewPassword || currentPassword) {
    const existingPassword = userData[currentUserIndex].password || "";
    const isCurrentPasswordValid =
      existingPassword === currentPassword?.trim() ||
      existingPassword === hashPassword(currentPassword?.trim() || "");

    if (!isCurrentPasswordValid) {
      return res.status(401).render("instructor/myProfile", {
        currentUser: userData[currentUserIndex],
        errorMessage: "Current password is incorrect.",
        successMessage: "",
      });
    }

    if (!newPassword?.trim() || newPassword.trim().length < 6) {
      return res.status(400).render("instructor/myProfile", {
        currentUser: userData[currentUserIndex],
        errorMessage: "New password must be at least 6 characters.",
        successMessage: "",
      });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).render("instructor/myProfile", {
        currentUser: userData[currentUserIndex],
        errorMessage: "New password and confirm password do not match.",
        successMessage: "",
      });
    }

    userData[currentUserIndex].password = hashPassword(newPassword.trim());
    passwordUpdated = true;
  }

  fs.writeFile(userDataPath, JSON.stringify(userData, null, 2), (error) => {
    if (error) {
      return res.status(500).render("instructor/myProfile", {
        currentUser: userData[currentUserIndex],
        errorMessage: "Failed to save profile changes.",
        successMessage: "",
      });
    }

    const token = jwt.sign(
      {
        email: userData[currentUserIndex].email,
        role: userData[currentUserIndex].role,
        name: userData[currentUserIndex].name || "",
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.setHeader("Set-Cookie", createAuthCookie(token));

    if (passwordUpdated) {
      return res.redirect("/instructor/instructorDashboard");
    }

    return res.render("instructor/myProfile", {
      currentUser: userData[currentUserIndex],
      errorMessage: "",
      successMessage: "Profile updated successfully.",
    });
  });
};

//My Lectures------------------------------------------------------------------------------------------------------------------
exports.lectures = (req, res) => {
  const currentUserName = req.user?.name || "";
  const assignedLectures = getAssignedLectures(currentUserName);

  res.render("instructor/myLectures", { lectureData: assignedLectures });
};
