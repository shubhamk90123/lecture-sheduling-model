//core modules
const path = require("path");

//External Modules
const express = require("express");
const adminRouter = express.Router();

adminRouter.post("/dashboard", (req, res) => {
  console.log(req.body, req.method);
  res.render("admin/dashboard");
});

exports.adminRouter = adminRouter;
