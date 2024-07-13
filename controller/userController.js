const User = require("../model/user");
const bcrypt = require("bcryptjs");
// const mail = require("../mail/mail");
const transporter = require("../mail/gmail")

exports.displayRegister = (req, res) => {
  console.log("get here");
  res.render('users/index');
};
exports.postRegister = async (req, res) => {
  try {
    const data = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(data.password,salt);
    data.password = hashed;


    const user = new User(data);
    await user.save();

    // Send confirmation email
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Registration Successful',
      text: `Hi ${name},\n\nThank you for registering at our site.\n\nBest Regards,\nYour Company`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Error while sending email');
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.redirect('/login');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// exports.editClassroom = async (req, res) => {
//   try {
//     const classroom = await Classroom.findById(req.params.id);
//     if (!classroom) {
//       return res.status(404).json({ message: "Classroom not found" });
//     }
//     res.render("classrooms/edit", { classroom });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// exports.createClassroom = async (req, res) => {
//   try {
//     // console.log(req.body);
//     // return;
//     const { name, program_code, room } = req.body;
//     const newClassroom = new Classroom({name, program_code, room  });

//     console.log(name);
//     console.log(program_code);
//     console.log(room);

//     await newClassroom.save();
//     res.redirect("/classrooms");
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.updateClassroom = async (req, res) => {
//   try {
//     const classroom = await Classroom.findById(req.params.id);
//     if (!classroom) {
//       return res.status(404).json({ message: "Classroom not found" });
//     }
//     Object.assign(classroom, req.body);
//     await classroom.save();
//     res.redirect("/classrooms");
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.deleteClassroom = async (req, res) => {
//   try {
//     const classroom = await Classroom.findById(req.params.id);
//     if (!classroom) {
//       return res.status(404).json({ message: "Classroom not found" });
//     }
//     // await classroom.remove();
//     await Classroom.deleteOne({ _id: req.params.id });
//     res.redirect("/classrooms");
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };
