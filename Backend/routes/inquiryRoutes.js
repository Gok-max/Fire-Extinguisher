const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, city, state, message } = req.body;

    // 🔍 Validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ msg: "Name, Email, Phone, and Message are required" });
    }

    // ✅ Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // 👈 prevents self-signed certificate error
      },
    });

    // ✅ Format Email Content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Admin Email
      subject: `New Inquiry from ${name}`,
      text: `
📩 You received a new inquiry!

👤 Name: ${name}
📧 Email: ${email}
📞 Phone: ${phone}
🏙️ City: ${city || "N/A"}
🌆 State: ${state || "N/A"}

📝 Message:
${message}
      `,
    };

    // ✅ Send mail
    await transporter.sendMail(mailOptions);

    res.status(200).json({ msg: "Message sent successfully!" });
  } catch (err) {
    console.error("Error while sending email:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
