const Student = require("./../model/student.model");


exports.getStudent = async (req, res) => {
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
    await student.remove();
    res.redirect('/students');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
