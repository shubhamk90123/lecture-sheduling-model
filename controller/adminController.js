exports.getDashboard = (req, res) => {
  res.render("admin/dashboard");
};

exports.postDashboard = (req, res) => {
  console.log(req.body, req.method);
  res.render("admin/dashboard");
};

exports.getDashboard = (req, res) => {
  res.render("admin/dashboard");
};

exports.addCourse = (req, res) => {
  res.render("admin/addCourse");
};

exports.viewInstructor = (req, res) => {
  res.render("admin/viewInstructors");
};

exports.allCources = (req, res) => {
  res.render("admin/allCourses");
};

exports.manageLec = (req, res) => {
  res.render("admin/manageLec");
};
