const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// Get all classrooms (Render the index.ejs)

router.get("/", userController.displayRegister);

// // Get form to create a new classroom (Render the new.ejs)

// router.get("/new", classroomController.newClassroom);

// // Create a classroom
// router.post("/", classroomController.createClassroom);

// // Get form to edit a classroom (Render the edit.ejs)
// router.get("/:id/edit", classroomController.editClassroom);
// // Update a classroom
// router.put("/:id", classroomController.updateClassroom);

// // Delete a classroom
// router.delete("/:id", classroomController.deleteClassroom);

module.exports = router;
