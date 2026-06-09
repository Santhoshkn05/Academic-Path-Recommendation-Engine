require("dotenv").config();

const express = require("express");
const cors = require("cors");
const recommendationRoutes = require("./routes/recommendationRoutes");
const submissionRoutes = require("./routes/submissionRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/recommend", recommendationRoutes);
app.use("/api/submissions", submissionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});