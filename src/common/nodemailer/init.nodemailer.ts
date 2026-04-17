import nodemailer from "nodemailer";
import { SMTP_PASS, SMTP_USER } from "../constant/email.constant";
// Create a transporter using SMTP
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});