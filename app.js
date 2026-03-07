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
const { pageRoute } = require("./routes/pageRoute");

// BODY PARSER -
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(rootdir, "public")));

// Routers
app.use("/admin", adminRouter);
app.use("/instructor", instructorRouter);
app.use("/", pageRoute);

// Routes
app.get("/", (req, res) => {
  res.render("rootPage");
});

app.use((req, res, next) => {
  res.render("404");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
