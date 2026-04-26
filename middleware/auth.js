const jwt = require("jsonwebtoken");
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

const parseCookies = (cookieHeader = "") => {
  return cookieHeader.split(";").reduce((acc, part) => {
    const [key, ...rest] = part.trim().split("=");
    if (!key) return acc;
    acc[key] = decodeURIComponent(rest.join("="));
    return acc;
  }, {}); 
};

const requireRole = (role) => {
  return (req, res, next) => {
    const cookies = parseCookies(req.headers.cookie || "");
    const token = cookies.authToken;

    if (!token) {
      return res.status(401).redirect("/login");
    }

    try {
      const payload = jwt.verify(token, JWT_SECRET);

      if (!payload.role || payload.role.toLowerCase() !== role.toLowerCase()) {
        return res.status(403).render("login", {
          errorMessage: "You are not authorized for this portal.",
        });
      }

      req.user = payload;
      return next();
    } catch (error) {
      return res.status(401).redirect("/login");
    }
  };
};

module.exports = {
  JWT_SECRET,
  requireRole,
};
