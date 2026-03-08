//Core Module
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const rootdir = require("../utils/path");

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

//Signup Logic
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

//Login Logic
exports.getLogin = (req, res) => {
  res.render("login");
};

exports.postLogin = (req, res) => {
  console.log(req.body, req.method);

  res.render("login");
};

exports.userData = userData;
