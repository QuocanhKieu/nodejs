const express = require("express");
const User = require("./../model/user.model");

const router = express.Router();
const controller = require("./../controller/user.controller");



router.get("/register", controller.register);
router.post("/register", controller.postRegister);
// Render the password reset request form
router.get("/request-reset", controller.requestResetGet);
router.post("/request-reset", controller.requestResetPost);
router.get("/reset/:token", async (req, res) => {
  try {
    console.log("gethere");

    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .send("Password reset token is invalid or has expired.");
    }

    res.render("user/reset", { token: req.params.token });
  } catch (err) {
    res.status(500).send("An error occurred. Please try again.");
  }
});

router.post("/reset/:token", async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .send("Password reset token is invalid or has expired.");
    }

    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    const mailOptions = {
      to: user.email,
      from: "kieuquocanh4@gmail.com",
      subject: "Password Changed",
      text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`,
    };

    // await transport.sendMail(mailOptions);
    transport.sendMail(mailOptions);

    res.status(200).send("Your password has been updated successfully.");
  } catch (err) {
    res.status(500).send("An error occurred. Please try again.");
  }
});

  router.get('/login', (req, res) => {
    console.log("get here");  
    res.render('user/login', { errors: null });
  });

  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.render('user/login', { errors: 'Invalid username or password' });
        }
        
        const match = await bcrypt.compare(password, user.password);
        
        if (!match) {
            return res.render('user/login', { errors: 'Invalid username or password' });
        }
        
        // Set session and redirect to a protected route (e.g., dashboard)
        req.session.user = { username: user.username,
          email: user.email,
          role: user.role,

        };
        res.redirect('/user/dashboard');
    } catch (error) {
        res.status(500).send('An error occurred. Please try again.');
    }
});

module.exports = router;
