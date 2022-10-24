"use strict";
const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "benton.schmitt98@ethereal.email",
    pass: "Ch3SN9HcY7mxfxx9ZD",
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

const emailProcessor = ({email, pin, type}) => {
  let info = "";
  switch (type) {
    case "request-new-password":
      info = {
        from: '"CRM Company" <benton.schmitt98@ethereal.email>', // sender address
        to: email, // list of receivers
        subject: "Password reset Pin", // Subject line
        text: `Here is your password reset pin ${pin} This pin will expire in 15 minutes`, // plain text body
        html: `<b>Hello</b>
                Here is your password reset pin
                <b>${pin} </b>
                This pin will expire in 15 minutes`, // html body
      };

      sendEmail(info);

      break;

    case "password-update-success":
      info = {
        from: '"CRM Company" <benton.schmitt98@ethereal.email>', // sender address
        to: email, // list of receivers
        subject: "Password updated", // Subject line
        text: `Your password has been update successfully!`, // plain text body
        html: `<b>Hello</b>
        <p>Your password has been update successfully!</p>`, // html body
      };

      sendEmail(info);

      break;

    default:
      break;
  }
};

module.exports = { emailProcessor };
