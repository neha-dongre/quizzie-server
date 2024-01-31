const express = require("express");
const router = express.Router();
const Quiz = require("../models/quizSchema");

router.get("/:quizId", async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: "An error occurred", details: error.message });
  }
});

router.post("/:quizId/impression", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    quiz.impressions++;
    await quiz.save();

    res.json({ message: "Impression recorded" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/:quizId/submit", async (req, res) => {
  const { quizId } = req.params;
  const { userAnswers } = req.body;

  try {
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    if (quiz.quizType !== "Poll Type") {
      Object.keys(userAnswers).forEach((questionIndex) => {
        if (userAnswers[questionIndex] === 1) {
          quiz.correctAnswers[questionIndex] = (quiz.correctAnswers[questionIndex] || 0) + 1;
        }
      });
    }

    quiz.impressions++;
    await quiz.save();

    res.json({ message: "Quiz answers submitted successfully" });
  } catch (error) {
    console.error("Error submitting quiz answers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
