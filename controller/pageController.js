//Core Module
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

//External Module
const jwt = require("jsonwebtoken");

const rootdir = require("../utils/path");
const { JWT_SECRET } = require("../middleware/auth");

let userData = [];
const userDataPath = path.join(rootdir, "data", "user.json");

try {
  if (fs.existsSync(userDataPath)) {
    const raw = fs.readFileSync(userDataPath, "utf-8");
    const parsed = raw ? JSON.parse(raw) : [];
    userData = Array.isArray(parsed) ? parsed : [];
  }
} catch (error) {
  console.error("Failed to load user data:", error.message);
  userData = [];
}

const hashPassword = (password) =>
  crypto.createHash("sha256").update(password).digest("hex");

const createAuthCookie = (token) => {
  const maxAge = 7 * 24 * 60 * 60;
  return `authToken=${encodeURIComponent(token)}; Path=/; HttpOnly; Max-Age=${maxAge}; SameSite=Lax`;
};

//Root page=================================================================================================
exports.rootPage = (req, res) => {
  res.render("rootPage");
};

//Signup Logic=============================================================================================
exports.getSignup = (req, res) => {
  res.render("signup");
};

exports.postSignup = (req, res) => {
  console.log(req.body, req.method);
  const { name, email, password, role, contact, specialization } = req.body;

  if (!name || !email || !password || !role || !contact) {
    return res.status(400).render("signup");
  }

  const normalizedEmail = email.trim().toLowerCase();
  const userExists = userData.some(
    (user) => user.email && user.email.toLowerCase() === normalizedEmail,
  );

  if (userExists) {
    return res.status(409).render("signup");
  }

  userData.push({
    name: name.trim(),
    email: normalizedEmail,
    password: hashPassword(password.trim()),
    role: role.trim(),
    contact: contact.trim(),
    specialization: specialization ? specialization.trim() : "",
  });

  fs.writeFile(userDataPath, JSON.stringify(userData, null, 2), (error) => {
    if (error) {
      console.error("Failed to save user data:", error.message);
    }
  });

  return res.redirect("/login");
};

//Login Logic==============================================================================================
exports.getLogin = (req, res) => {
  res.render("login", { errorMessage: "" });
};

exports.postLogin = (req, res) => {
  const { email, password, portal } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .render("login", { errorMessage: "Email and password are required." });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = userData.find(
    (entry) => entry.email && entry.email.toLowerCase() === normalizedEmail,
  );

  if (!user) {
    return res
      .status(401)
      .render("login", { errorMessage: "Invalid email or password." });
  }

  const hashedInputPassword = hashPassword(password.trim());
  const isValidPassword =
    user.password === hashedInputPassword || user.password === password.trim();

  if (!isValidPassword) {
    return res
      .status(401)
      .render("login", { errorMessage: "Invalid email or password." });
  }

  const userRole = (user.role || "").toLowerCase();
  const requestedPortal = (portal || "").toLowerCase();

  if (requestedPortal && requestedPortal !== userRole) {
    return res.status(403).render("login", {
      errorMessage: `You cannot sign in to the ${requestedPortal} portal with ${userRole} role.`,
    });
  }

  const token = jwt.sign(
    {
      email: user.email,
      role: userRole,
      name: user.name || "",
    },
    JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.setHeader("Set-Cookie", createAuthCookie(token));

  if (userRole === "admin") {
    return res.redirect("/admin/dashboard");
  }

  if (userRole === "instructor") {
    return res.redirect("/instructor/instructorDashboard");
  }

  return res
    .status(403)
    .render("login", { errorMessage: "Role is not allowed for any portal." });
};

exports.logout = (req, res) => {
  res.setHeader(
    "Set-Cookie",
    "authToken=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax",
  );
  return res.redirect("/login");
};

exports.userData = userData;
