const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const student_schema = new mongoose.Schema({
//     name: String,
//     email: String,
//     dob: Date,
//     mark: Number
// });
// module.exports = mongoose.model("Student",student_schema);

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  mark: {
    type: Number,
    required: true,
  },
  classroom: { type: Schema.Types.ObjectId, ref: 'Classroom' } // Reference to Classroom
});

module.exports = mongoose.model("Student", studentSchema);
