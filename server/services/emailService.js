const nodemailer = require("nodemailer");

let transporter = null;

// Initialize transporter with timeout and connection pool settings
function createTransporter() {
    try {
        transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            pool: true,
            maxConnections: 5,
            maxMessages: 100,
            connectionTimeout: 10000, // 10 seconds
            greetingTimeout: 5000, // 5 seconds
            socketTimeout: 10000, // 10 seconds
            logger: true,
            debug: process.env.NODE_ENV === 'development'
        });

        console.log("Email transporter created successfully");
        return transporter;
    } catch (error) {
        console.error("Failed to create email transporter:", error);
        return null;
    }
}

// Verify transporter connection on startup
async function verifyEmailConnection() {
    if (!transporter) {
        transporter = createTransporter();
    }

    if (!transporter) {
        console.error("Email transporter not available - email sending disabled");
        return false;
    }

    try {
        await transporter.verify();
        console.log("Email transporter connection verified successfully");
        return true;
    } catch (error) {
        console.error("Email transporter verification failed:", error.message);
        console.error("Email sending will be disabled");
        return false;
    }
}

async function sendRecommendationEmail(
    name,
    email,
    recommendation,
    reason
) {
    if (!transporter) {
        console.warn("Email transporter not initialized - skipping email");
        return null;
    }

    console.log("========== EMAIL SERVICE START ==========");
    console.log("To:", email);
    console.log("Name:", name);
    console.log("Recommendation:", recommendation);

    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Academic Pathway Recommendation",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2563eb; margin-bottom: 20px;">Academic Pathway Recommendation</h2>
                    
                    <p style="font-size: 16px; margin-bottom: 15px;">
                        Hello <strong>${name}</strong>,
                    </p>
                    
                    <p style="font-size: 16px; margin-bottom: 15px;">
                        Your academic pathway recommendation has been generated successfully.
                    </p>
                    
                    <div style="background: #f5f7ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #1e293b; margin-bottom: 10px;">Recommended Pathway</h3>
                        <p style="font-size: 18px; font-weight: bold; color: #2563eb; margin-bottom: 15px;">
                            ${recommendation}
                        </p>
                        
                        <h3 style="color: #1e293b; margin-bottom: 10px;">Reason</h3>
                        <p style="font-size: 15px; color: #64748b; line-height: 1.6;">
                            ${reason}
                        </p>
                    </div>
                    
                    <p style="font-size: 14px; color: #64748b; margin-top: 20px;">
                        Thank you for using the Academic Pathway Recommendation Engine.
                    </p>
                    
                    <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
                    
                    <small style="color: #94a3b8;">
                        Generated automatically on ${new Date().toLocaleString()}
                    </small>
                </div>
            `
        });

        console.log("Email sent successfully - Message ID:", info.messageId);
        console.log("========== EMAIL SERVICE END ==========");
        return info;

    } catch (error) {
        console.error("========== EMAIL SERVICE ERROR ==========");
        console.error("Failed to send email:", error.message);
        console.error("Error code:", error.code);
        console.error("Error details:", error);
        console.error("==========================================");
        
        // Don't throw - return null to indicate failure without blocking
        return null;
    }
}

// Non-blocking email send - doesn't await the result
function sendRecommendationEmailNonBlocking(
    name,
    email,
    recommendation,
    reason
) {
    // Fire and forget - don't await
    sendRecommendationEmail(name, email, recommendation, reason)
        .catch(error => {
            console.error("Non-blocking email send failed:", error);
        });
}

module.exports = {
    sendRecommendationEmail,
    sendRecommendationEmailNonBlocking,
    verifyEmailConnection,
    createTransporter
};