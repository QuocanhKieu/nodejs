const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const port = 2305;


app.use(session({
    secret: 't2305msecretKey123456', // Replace with a secure key
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS(when actually deployed)
}));
app.use(bodyParser.urlencoded({ extended: true }));
// set static
app.use(express.static("public"));
// set view engine
app.set("view engine",'ejs');
require("./model/database");
// routes
const webrouter = require("./routes/web.route");
app.use("/",webrouter);

//routes classroom 
const classroom_router = require("./routes/classroom.route");
app.use("/classroom",classroom_router);
//authentication
const user_router = require("./routes/user.route");
app.use("/auth",user_router);

app.listen(port,function(){
    console.log("Server is running....");
});