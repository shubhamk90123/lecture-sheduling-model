const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "frontEnd")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/frontEnd/model/login.html");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
