const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER_ACC,
        pass: process.env.EMAIL_USER_PASS,
    }
});

async function sendSmsToEmail(email, otp) {
    try {
        await transporter.sendMail({
            to: email,
            subject: "Tasdiqlash kodi",
            from: process.env.EMAIL_USER_ACC,
            text: `Tasdiqlash kodini hech kimga bermang! ${otp}`,
        })
    } catch (error) {
        console.log(error);
    }
};

module.exports = sendSmsToEmail