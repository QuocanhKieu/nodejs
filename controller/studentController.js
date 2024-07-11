const Student = require("../model/student");
const Classroom = require("../model/classroom");

exports.getStudent = async (req, res) => {
  try {
    const students = await Student.find();
    res.render("students/index", { students });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllClassrooms = async (req, res, next) => {
  try {
    const classrooms = await Classroom.find();
    res.locals.classrooms = classrooms;
    next();
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.newStudent = (req, res) => {
  res.render("students/new", { classrooms: res.locals.classrooms });
};

exports.createStudent = async (req, res) => {
  const { name, email, dob, mark, classroom } = req.body;

  try {
    const student = new Student({ name, email, dob, mark, classroom });
    await student.save();

    const classroomDoc = await Classroom.findById(classroom);
    classroomDoc.students.push(student._id);
    await classroomDoc.save();

    res.redirect("/students"); // Redirect to a route that shows the list of students
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.editStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.render("students/edit", { student, classrooms: res.locals.classrooms });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// exports.updateStudent = async (req, res) => {
//   try {
//     const student = await Student.findById(req.params.id);
//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }
//     Object.assign(student, req.body);
//     await student.save();
//     res.redirect("/students");
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

exports.updateStudent = async (req, res) => {
  const { name, email, dob, mark, classroom } = req.body;
  const studentId = req.params.id;

  console.log(name);
  console.log(email);
  console.log(dob);
  console.log(mark);
  console.log(classroom);
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).send("Student not found");
    }

    // Update student fields
    student.name = name;
    student.email = email;
    student.dob = new Date(dob);
    student.mark = mark;

   // Handle classroom change
   if (student.classroom && !student.classroom.equals(classroom)) {
    // Remove student from the old classroom
    const oldClassroom = await Classroom.findById(student.classroom);
    if (oldClassroom) {
      oldClassroom.students.pull(student._id);
      await oldClassroom.save();
    }
  }
    // Add student to the new classroom
    student.classroom = classroom;
    const newClassroom = await Classroom.findById(classroom);
    if (newClassroom) {
      newClassroom.students.push(student._id);
      await newClassroom.save();
    }
    await student.save();
    res.redirect("/students"); // Redirect to a route that shows the list of students
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    // await student.remove();
    await Student.deleteOne({ _id: req.params.id });
    res.redirect("/students");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
