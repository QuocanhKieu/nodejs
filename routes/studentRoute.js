const express = require("express");
const router = express.Router();
const studentController = require("../controller/studentController");

// Get all students (Render the index.ejs)

router.get("/", studentController.getStudent);

// Get form to create a new student (Render the new.ejs)

router.get(
  "/new",
  studentController.getAllClassrooms,
  studentController.newStudent
);

// Create a student
router.post("/", studentController.createStudent);

// Get form to edit a student (Render the edit.ejs)
router.get("/:id/edit", studentController.getAllClassrooms, studentController.editStudent);
// Update a student
router.put("/:id", studentController.updateStudent);

// Delete a student
router.delete("/:id", studentController.deleteStudent);

module.exports = router;
