//core modules
const path = require("path");

//External modules
const express = require("express");
const instructorRouter = express.Router();

instructorRouter.post("/dashboard", (req, res) => {
  console.log(req.body, req.method);
  res.sendFile(path.join(__dirname, "../views/instructor/dashboard.html"));
});

module.exports = instructorRouter;
