require("dotenv").config();

const express = require("express");
const cors = require("cors");
const recommendationRoutes = require("./routes/recommendationRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const { verifyEmailConnection, createTransporter } = require("./services/emailService");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/submissions", submissionRoutes);

const PORT = process.env.PORT || 5000;

// Initialize and verify email service on startup
async function initializeServices() {
    console.log("Initializing services...");
    
    // Create email transporter
    createTransporter();
    
    // Verify email connection
    const emailVerified = await verifyEmailConnection();
    if (emailVerified) {
        console.log("Email service initialized successfully");
    } else {
        console.log("Email service unavailable - recommendations will work without email notifications");
    }
}

// Start server
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await initializeServices();
});