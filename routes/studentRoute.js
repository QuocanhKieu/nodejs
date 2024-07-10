const express = require("express");
const router = express.Router();
const studentController = require("../controller/studentController");
const Student = require("../model/student.model");

// Get all students (Render the index.ejs)

router.get("/", studentController.getStudent);

// Get form to create a new student (Render the new.ejs)
<<<<<<< HEAD
router.get("/new", (req, res) => {
  res.render("new");
});

router.get("/new");
// Get form to edit a student (Render the edit.ejs)
router.get("/:id/edit", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.render("edit", { student });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
=======

router.get("/new",studentController.newStudent);

>>>>>>> 215a93c (10/7)

// Create a student
router.post("/", studentController.createStudent);

<<<<<<< HEAD
=======
// Get form to edit a student (Render the edit.ejs)
router.get("/:id/edit", studentController.editStudent);
>>>>>>> 215a93c (10/7)
// Update a student
router.put("/:id", studentController.updateStudent);

// Delete a student
router.delete("/:id", studentController.deleteStudent);

module.exports = router;
