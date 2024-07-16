const nodemailer = require("nodemailer");
const config = {
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 587, // NO_SSL // 465 (SSL)
  auth: {
    user: "kieuquocanh4@gmail.com",
    pass: "unwh yrdo uoif kpyt",
  },
  // unwh yrdo uoif kpyt
};
const transport = nodemailer.createTransport(config);
module.exports = transport;
