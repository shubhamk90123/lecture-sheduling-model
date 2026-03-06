exports.getDashboard = (req, res) => {
  res.render("instructor/dashboard");
};

exports.postDashboard = (req, res) => {
  console.log(req.body, req.method);
  res.render("instructor/dashboard");
};

exports.profile = (req, res) => {
  res.render("instructor/myProfile");
};
 
exports.updateProfile = (req, res) => {
  console.log(req.body);
  res.redirect("/instructor/dashboard");
};

exports.lectures = (req, res) => {
  res.render("instructor/myLectures");
};


