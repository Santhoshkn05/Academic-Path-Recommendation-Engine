const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendRecommendationEmail(
    name,
    email,
    recommendation,
    reason
) {
    try {

        const data = await resend.emails.send({
            from: "Academic path service <no-reply@acpaths.com>",
            to: email,
            subject: "Academic Pathway Recommendation",
            html: `
                <h2>Academic Pathway Recommendation</h2>

                <p>Hello ${name},</p>

                <h3>${recommendation}</h3>

                <p>${reason}</p>
            `
        });

        console.log("Email sent:", data);

    } catch (error) {

        console.error("Email error:", error);
    }
}

module.exports = {
    sendRecommendationEmail
};