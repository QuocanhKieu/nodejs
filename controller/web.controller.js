const Student = require("./../model/student");
exports.student_get = async function (req, res) {
  // query
  let list = await Student.find();
  // res.sendFile(__dirname+"/views/home.html");
  let x = 0;
  res.render("home", {
    students: list,
    count: x,
  });
};
