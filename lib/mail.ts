import nodemailer from "nodemailer";

const pass = process.env.EMAIL_PASSWORD;
const email = process.env.EMAIL;
const recipient = process.env.EMAIL_RECIPIENT;

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: { user: email, pass },
});

export const mailOptions = {
  from: email,
  to: recipient,
};
