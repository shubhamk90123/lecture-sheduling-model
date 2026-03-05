const exress = require("express");
const adminRouter = exress.Router();

adminRouter.get("/", (req, res) => {
  res.send(` <h1>go to Instructor page </h1>
    <a href='/instructor'>Instructor</a>
    <a href='/'>Home</a>`);
});

module.exports = adminRouter;
