const Classroom = require("../model/classroom");

exports.getClassroom = async (req, res) => {
  try {
    const classrooms = await Classroom.find();
    res.render("classrooms/index", { classrooms });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.newClassroom = (req, res) => {
  res.render("classrooms/new");
};

exports.editClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }
    res.render("classrooms/edit", { classroom });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.createClassroom = async (req, res) => {
  try {
    // console.log(req.body);
    // return;
    const { name, program_code, room } = req.body;
    const newClassroom = new Classroom({name, program_code, room  });

    console.log(name);
    console.log(program_code);
    console.log(room);

    await newClassroom.save();
    res.redirect("/classrooms");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }
    Object.assign(classroom, req.body);
    await classroom.save();
    res.redirect("/classrooms");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }
    // await classroom.remove();
    await Classroom.deleteOne({ _id: req.params.id });
    res.redirect("/classrooms");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
