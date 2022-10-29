"use strict";
const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = (info) => {
  return new Promise(async (resolve, reject) => {
    try {
      // send mail with defined transport object
      let result = await transporter.sendMail(info);

      console.log("Message sent: %s", result.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

      resolve(result);
    } catch (error) {
      console.log(error);
    }
  });
};

const emailProcessor = ({ email, pin, type, verificationLink = "", passwordResetLink = "" }) => {
  let info = "";
  switch (type) {
    case "request-new-password":
      info = {
        from: `"CRM Company" <${process.env.SMTP_USERNAME}>`, // sender address
        to: email, // list of receivers
        subject: "Password reset Pin", // Subject line
        text: `Here is your password reset link ${passwordResetLink} and your verification pin is ${pin} This link will expire in 15 minutes`, // plain text body
        html: `<b>Hello</b>
                Here is your password reset link
                <a href="${passwordResetLink}">${passwordResetLink}</a>
                <p><b>${pin}</b></p>
                This link will expire in 15 minutes`, // html body
      };

      sendEmail(info);

      break;

    case "password-update-success":
      info = {
        from: `"CRM Company" <${process.env.SMTP_USERNAME}>`, // sender address
        to: email, // list of receivers
        subject: "Password updated", // Subject line
        text: `Your password has been update successfully!`, // plain text body
        html: `Hello
        <p>Your password has been update successfully!</p>`, // html body
      };

      sendEmail(info);

      break;

    case "new-user-confirmation-required":
      info = {
        from: `"CRM Company" <${process.env.SMTP_USERNAME}>`, // sender address
        to: email, // list of receivers
        subject: "Please verify your account", // Subject line
        text: `Please follow the link to verify your account`, // plain text body
        html: `Hello
        <p>Please follow the link to verify your account</p>
        <a href="${verificationLink}">${verificationLink}</a>
        <p><b>${pin}</b></p>
        `, // html body
      };

      sendEmail(info);

      break;

    default:
      break;
  }
};

module.exports = { emailProcessor };
