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

// Routers
app.use("/admin", adminRouter);
app.use("/instructor", instructorRouter);

// Routes
app.get("/", (req, res) => {
  res.render("login");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
