//Core modules
const path = require("path");

//External modules
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const rootdir = require("./utils/path");

//Local modules
const { adminRouter } = require("./routes/adminRouter");
const { instructorRouter } = require("./routes/instructorRouter");

// BODY PARSER -
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(rootdir, "public")));

// Routers
app.use("/admin", adminRouter);
app.use("/instructor", instructorRouter);

// Routes
app.get("/", (req, res) => {
  res.render("signup");
});

app.post("/login", (req, res) => {
  console.log(req.body, req.method);
  res.render("login");
});

app.get("/login", (req, res) => {
  res.render("login");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
