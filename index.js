const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const cors = require("cors");

const PORT = process.env.PORT || 4000;
const allowedOrigins = [
  "https://quizzie-client.onrender.com",
  "https://quizzie-client-mu.vercel.app",
  "http://localhost:3000",
];

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// API health check
app.get("/health", (req, res) => {
  res.json({ message: "All good!" });
});

// Routes
const authRoutes = require("./routes/authentication");
const analyticsRoutes = require("./routes/analytics");
const quizQuestionsRoutes = require("./routes/quizQuestions");
const quizRoutes = require("./routes/quizControl");

app.use("/api", authRoutes);
app.use("/api", analyticsRoutes);
app.use("/api/quiz", quizQuestionsRoutes);
app.use("/api", quizRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
