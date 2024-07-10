const express = require("express");
<<<<<<< HEAD
const app = express();
const port = 2305;

=======
const path = require('path');
const app = express();
const port = 2305;
const bodyParser = require('body-parser');
// const methodOverride = require('method-override');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(methodOverride('_method'));

//
>>>>>>> 215a93c (10/7)
app.listen(port, function () {
  console.log("Server is running....");
});
// set static
app.use(express.static("public"));
// set view engine
<<<<<<< HEAD
app.set("view engine", "ejs");
=======
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Ensure this path points to your views directory
>>>>>>> 215a93c (10/7)
require("./model/database");
// routes
const webrouter = require("./routes/web.route");
const studentsRouter = require("./routes/studentRoute.js");
app.use("/", webrouter);
app.use("/students", studentsRouter);

//
//routes/studentRoute.js
