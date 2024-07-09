const express = require("express");
const app = express();
const port = 2305;

app.listen(port, function () {
  console.log("Server is running....");
});
// set static
app.use(express.static("public"));
// set view engine
app.set("view engine", "ejs");
require("./model/database");
// routes
const webrouter = require("./routes/web.route");
const studentsRouter = require("./routes/studentRoute.js");
app.use("/", webrouter);
app.use("/students", studentsRouter);

//
//routes/studentRoute.js
