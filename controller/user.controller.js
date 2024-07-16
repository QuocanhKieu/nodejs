const User = require("./../model/user.model");
const bcrypt = require("bcryptjs");
const mail = require("./../mail/mail");
const crypto = require("crypto");

exports.register = (req, res) => {
  res.render("user/register");
};
exports.postRegister = async (req, res) => {
  try {
    const data = req.body;
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(data.password, salt);
    data.password = hashed;

    const user = new User(data);
    user.save();

    // send email -- nodemailer
    mail.mail("GMAIL").sendMail({
      from: "kieuquocanh4@gmail.com",
      to: user.email,
      cc: "",
      bcc: "",
      subject: "NHớ từ giờ gửi có subject ko sẽ bị trượt",
      // text: ""
      html: "<h1>Welcome you </h1>",
    });

    res.redirect("/");
  } catch (error) {
    // catch (error) {
    //     res.status(400).send(error);
    // }
    // Handle errors and re-render the registration view with error messages
    const errorMessages = {};
    if (error.errors) {
      for (let key in error.errors) {
        errorMessages[key] = error.errors[key].message;
      }
    } else {
      errorMessages.general = error.message;
    }

    res
      .status(400)
      .render("user/register", { errors: errorMessages, data: req.body });
  }
};

exports.requestResetGet = (req, res) => {
  res.render("user/request-reset");
};

exports.requestResetPost = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("No user with that email found.");
    }

    // Generate a token
    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now

    await user.save();

    const resetUrl = `http://${req.headers.host}/auth/reset/${token}`;
    const mailOptions = {
      to: user.email,
      from: "kieuquocanh4@gmail.com",
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                   Please click on the following link, or paste this into your browser to complete the process:\n\n
                   ${resetUrl}\n\n
                   If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    mail.mail("GMAIL").sendMail(mailOptions);

    res
      .status(200)
      .send("A password reset link has been sent to your email address.");
  } catch (err) {
    res.status(500).send("An error occurred. Please try again.");
  }
};
