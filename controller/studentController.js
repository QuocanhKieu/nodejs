const Student = require("./../model/student.model");


exports.getStudent = async (req, res) => {
<<<<<<< HEAD
    try {
      const students = await Student.find();
      res.render("index", { students });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  exports.newStudent = (req, res) => {
    res.render("students.new");
  };
exports.createStudent = async (req, res) => {
  try {
    const { name, email, dob, marks } = req.body;
    const newStudent = new Student({ name, email, dob, marks });
=======
  try {
    const students = await Student.find();
    res.render("students/index", { students });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.newStudent = (req, res) => {
  res.render("students/new");
};

exports.editStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.render("students/edit", { student });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.createStudent = async (req, res) => {
  try {
    // console.log(req.body);
    // return;
    const { name, email, dob, mark } = req.body;
    const newStudent = new Student({ name, email, dob, mark });

    console.log(name);
    console.log(email);
    console.log(dob);
    console.log(mark);

>>>>>>> 215a93c (10/7)
    await newStudent.save();
    res.redirect('/students');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    Object.assign(student, req.body);
    await student.save();
    res.redirect('/students');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
<<<<<<< HEAD
    await student.remove();
=======
    // await student.remove();
    await Student.deleteOne({ _id: req.params.id });
>>>>>>> 215a93c (10/7)
    res.redirect('/students');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
