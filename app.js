//Core modules
const path = require("path");

//External modules
const express = require("express");
const app = express();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const mongoSanitize = require("express-mongo-sanitize");
const logger = require("./utils/logger");

require("dotenv").config();
const connectDB = require("./utils/db");
connectDB();

// Security Headers
// Security Headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": ["'self'", "data:", "https:"],
      "script-src": ["'self'", "'unsafe-inline'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));


// Compression
app.use(compression());

// Rate Limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes"
});
app.use("/login", authLimiter);
app.use("/signup", authLimiter);

// View Engine
app.set("view engine", "ejs");
app.set("views", "views");

const rootDir = require("./utils/path");

//Local modules
const { adminRouter } = require("./routes/adminRouter");
const { instructorRouter } = require("./routes/instructorRouter");
const { pageRoute } = require("./routes/pageRoute");

// BODY PARSER
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static(path.join(rootDir, "public")));

// Data Sanitization against NoSQL query injection
app.use((req, res, next) => {
  mongoSanitize.sanitize(req.body);
  mongoSanitize.sanitize(req.params);
  mongoSanitize.sanitize(req.query);
  next();
});

// Routers
app.use("/admin", adminRouter);
app.use("/instructor", instructorRouter);
app.use("/", pageRoute);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).render("404");
});

// Global Error Handler
app.use((err, req, res, next) => {
  logger.error(`${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  const statusCode = err.statusCode || 500;
  
  // If user is authenticated, we should probably show an error on the portal they are in
  const pageTitle = "Error";
  const errorMessage = process.env.NODE_ENV === 'production' ? "An unexpected error occurred." : err.message;

  if (req.user) {
    return res.status(statusCode).render("dashboard", {
      role: req.user.role,
      pageTitle,
      errorMessage,
      currentUserName: req.user.name,
      // Provide defaults for dashboard variables to prevent crashes
      instructors: [],
      courseData: [],
      lectureData: [],
      totalCourses: 0,
      totalInstructors: 0,
      totalSheduleLec: 0,
      upcomingLectures: 0,
      pastLectures: 0
    });
  }

  res.status(statusCode).render("login", { 
    pageTitle, 
    errorMessage 
  });
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  logger.info(`Server running on http://localhost:${port}`);
});
