const fs = require("fs");
const path = require("path");

let arr = [];

const filePath = path.join(__dirname, "../data/admin.json");

exports.getSignup = (req, res) => {
  console.log(req.method);
  res.render("signup");
};

exports.postSignup = (req, res) => {
  console.log(req.body, req.method);
  res.redirect("/login");
};

exports.getLogin = (req, res) => {
  res.render("login");
};

exports.postLogin = (req, res) => {
  console.log(req.body, req.method);
  const { name, email, password, role } = req.body;

  arr.push(req.body);

  res.render("login");

  console.log(arr);
};
