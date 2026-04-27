//User Model
const User = require("../model/user");

//External Modules
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { JWT_SECRET } = require("../middleware/auth");
const { validationResult } = require("express-validator");

//Root page=================================================================================================
exports.rootPage = (req, res) => {
  res.render("rootPage", { pageTitle: "Welcome" });
};

//Signup Logic=============================================================================================
exports.getSignup = (req, res) => {
  res.render("signup", { pageTitle: "Create Account", errorMessage: "" });
};

exports.postSignup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("signup", { 
      pageTitle: "Create Account", 
      errorMessage: errors.array()[0].msg 
    });
  }

  try {
    const { name, email, password, confirmPassword, role, contact, specialization } = req.body;

    if (!name || !email || !password || !confirmPassword || !role || !contact) {
      return res.status(400).render("signup", { pageTitle: "Create Account", errorMessage: "All fields are required." });
    }

    if (password !== confirmPassword) {
      return res.status(400).render("signup", { pageTitle: "Create Account", errorMessage: "Passwords do not match." });
    }

    const allowedRoles = ["instructor", "admin"];
    if (!allowedRoles.includes(role.toLowerCase())) {
      return res.status(403).render("signup", { 
        pageTitle: "Create Account", 
        errorMessage: "Invalid role selected." 
      });
    }

    if (password.length < 8) {
      return res.status(400).render("signup", { pageTitle: "Create Account", errorMessage: "Password must be at least 8 characters long." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const userExists = await User.findOne({ email: normalizedEmail });

    if (userExists) {
      return res.status(409).render("signup", { pageTitle: "Create Account", errorMessage: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: role.trim(),
      contact: contact.trim(),
      specialization: specialization ? specialization.trim() : "",
    });

    await user.save();

    return res.redirect("/login");
  } catch (error) {
    console.error("Signup error:", error.message);
    return res.status(500).render("signup", { pageTitle: "Create Account", errorMessage: "Error creating account." });
  }
};

//Login Logic==============================================================================================
exports.getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login", errorMessage: "" });
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password, portal } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .render("login", { pageTitle: "Login", errorMessage: "Email and password are required." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res
        .status(401)
        .render("login", { pageTitle: "Login", errorMessage: "Invalid email or password." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(401)
        .render("login", { pageTitle: "Login", errorMessage: "Invalid email or password." });
    }

    const userRole = user.role.toLowerCase();
    const requestedPortal = (portal || "").toLowerCase();

    if (requestedPortal && requestedPortal !== userRole) {
      return res.status(403).render("login", {
        pageTitle: "Login",
        errorMessage: `You cannot sign in to the ${requestedPortal} portal with a ${userRole} account.`,
      });
    }

    const payload = {
      userId: user._id,
      name: user.name,
      email: user.email,
      role: userRole,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    if (userRole === "admin") {
      return res.redirect("/admin/dashboard");
    }

    if (userRole === "instructor") {
      return res.redirect("/instructor/instructorDashboard");
    }

    return res
      .status(403)
      .render("login", { pageTitle: "Login", errorMessage: "Role is not allowed for any portal." });

  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).render("login", { pageTitle: "Login", errorMessage: "Something went wrong. Please try again." });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("authToken");
  return res.redirect("/login");
};
