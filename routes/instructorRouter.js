const exress = require("express");
const instructorRouter = exress.Router();

instructorRouter.get("/", (req, res) => {
  res.send(
    `<h1>go to admin page </h1><a href='/admin'>admin</a> <a href='/'>Home</a>`,
  );
});

module.exports = instructorRouter;
