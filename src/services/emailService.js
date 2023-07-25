const nodemailer = require('nodemailer');

// Create a reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // your SMTP username
    pass: process.env.EMAIL_PASS, // your SMTP password
  },
});

async function sendWelcomeEmail(userEmail, userName) {
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"MyApp" <info@myapp.com>', // sender address
    to: userEmail, // list of receivers
    subject: "Welcome to MyApp", // Subject line
    text: `Hello ${userName}, welcome to MyApp. We're glad to have you onboard.`, // plain text body
  });

  console.log(`Message sent: ${info.messageId}`);
}

module.exports = {
  sendWelcomeEmail,
};
