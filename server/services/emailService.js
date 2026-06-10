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

    console.log("========== EMAIL DEBUG ==========");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Recommendation:", recommendation);
    console.log("Reason:", reason);
    console.log("=================================");

    if (!email) {
        throw new Error("Recipient email is missing");
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Academic Pathway Recommendation",

        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                
                <h2 style="color:#2563eb;">
                    Academic Pathway Recommendation
                </h2>

                <p>Hello <strong>${name}</strong>,</p>

                <p>
                    Your academic pathway recommendation has been generated successfully.
                </p>

                <div style="
                    background:#f5f7ff;
                    padding:15px;
                    border-radius:8px;
                    margin:15px 0;
                ">
                    <h3>Recommended Pathway</h3>
                    <p>
                        <strong>${recommendation}</strong>
                    </p>

                    <h3>Reason</h3>
                    <p>${reason}</p>
                </div>

                <p>
                    Thank you for using the Academic Pathway Recommendation Engine.
                </p>

                <hr>

                <small>
                    Generated automatically on
                    ${new Date().toLocaleString()}
                </small>

            </div>
        `
    };

    const info = await transporter.sendMail(
        mailOptions
    );

    console.log(
        "Email sent successfully:",
        info.messageId
    );
    console.log(info);

    return info;
}

module.exports = {
    sendRecommendationEmail
};