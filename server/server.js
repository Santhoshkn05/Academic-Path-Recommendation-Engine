require("dotenv").config();

const express = require("express");
const cors = require("cors");

const recommendationRoutes =
require("./routes/recommendationRoutes");

const submissionRoutes =
require("./routes/submissionRoutes");

const app = express();

app.use(cors({
    origin: [
        "https://academic-path-recommendation-engine.vercel.app",
        "http://localhost:5500",
        "http://127.0.0.1:5500"
    ]
}));

app.use(express.json());

app.use(
    "/api/recommendations",
    recommendationRoutes
);

app.use(
    "/api/submissions",
    submissionRoutes
);

app.get("/", (req, res) => {
    res.send("Backend Working");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});