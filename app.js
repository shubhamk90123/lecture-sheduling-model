//Core modules
const path = require("path");

//External modules
const express = require("express");
const app = express();
const rootdir = require("./utils/path");

//Local module
const adminRouter = require("./routes/adminRouter");
const instructorRouter = require("./routes/instructorRouter");

app.use(express.static(path.join(rootdir, "public")));

app.use("/admin", adminRouter);
app.use("/instructor", instructorRouter);

app.use("/", (req, res, next) => {
  console.log(req.body, req.method);
  res.sendFile(path.join(rootdir, "views/login.html"));
  // res.send(`<h1>Home page</h1>
  //   <a href='/admin'>Admin</a><br>
  //   <a href='/instructor'>Instructor</a>`);
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
