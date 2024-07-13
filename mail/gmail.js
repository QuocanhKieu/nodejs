// const nodemailer = require("nodemailer");
// const config = {
//     service: "Gmail",
//     host: "smtp.gmail.com",
//     port: 587, // NO_SSL // 465 (SSL)
//     auth: {
//         user: "hoatq4@fpt.edu.vn",
//         pass: 'wncnqyscslmgnrga'
//     }
// }
// const transport = nodemailer.createTransport(config);
// module.exports = transport;


const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'Gmail', // or another email service
  auth: {
    user: process.env.EMAIL_USER,//t2305m
    pass: process.env.EMAIL_PASS,//zflc vfyr tmgp qumo

  },
});

module.exports = transporter;