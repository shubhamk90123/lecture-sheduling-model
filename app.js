//Core modules
const path = require("path");

//External modules
const express = require("express");
const app = express();

require("dotenv").config();
const connectDB = require("./utils/db");
connectDB();

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

// Routers
app.use("/admin", adminRouter);
app.use("/instructor", instructorRouter);
app.use("/", pageRoute);

app.use((req, res, next) => {
  res.status(404).render("404");
});

const port = 3002;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
