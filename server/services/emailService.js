const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendRecommendationEmail(
    name,
    email,
    recommendation,
    reason
) {

    console.log("Starting sendMail...");

    const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Academic Pathway Recommendation",

        html: `
            <h2>Academic Pathway Recommendation</h2>
            <p>Hello ${name},</p>
            <h3>${recommendation}</h3>
            <p>${reason}</p>
        `
    });

    console.log("Email Sent Successfully");
    console.log(info);
    
    return info;
}

module.exports = {
    sendRecommendationEmail
};