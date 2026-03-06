//Core modules
const path = require("path");

//External modules
const express = require("express");
const app = express();

const rootdir = require("./utils/path");

//Local modules
const adminRouter = require("./routes/adminRouter");
const instructorRouter = require("./routes/instructorRouter");

// BODY PARSER -
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(rootdir, "public")));

// Routers
app.use("/admin", adminRouter);
app.use("/instructor", instructorRouter);

// Routes
app.get("/login", (req, res) => {
  res.sendFile(path.join(rootdir, "views/login.html"));
});

app.post("/login", (req, res) => {
  console.log(req.body);
  res.sendFile(path.join(rootdir, "views/login.html"));
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
