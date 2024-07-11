const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const student_schema = new mongoose.Schema({
//     name: String,
//     email: String,
//     dob: Date,
//     mark: Number
// });
// module.exports = mongoose.model("Student",student_schema);

const classRoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [50, "Name must be less than 50 characters long"],
  },
  program_code: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  students: [{ type: Schema.Types.ObjectId, ref: "Student" }], // Array of references to Students
});

module.exports = mongoose.model("Classroom", classRoomSchema);
