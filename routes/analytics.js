const express = require("express");
const router = express.Router();
const Quiz = require("../models/quizSchema.js");

// Analytics tab API
router.get("/quizzes", async (req, res) => {
  try {
    const { email } = req.query;
    const quizzes = await Quiz.find({ email });
    res.json({ data: quizzes });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ error: "An error occurred while fetching quizzes" });
  }
});

// For quizData in the dashboard Screen
router.get("/userData", async (req, res) => {
  try {
    const { email } = req.query;
    const quizzes = await Quiz.find({ email });

    const totalQuizzes = quizzes.length;
    const totalQuestions = quizzes.reduce((sum, quiz) => {
      return (
        sum +
        quiz.questions.reduce((questionSum, questionSet) => {
          return questionSum + Object.keys(questionSet.pollQuestion).length;
        }, 0)
      );
    }, 0);
    const totalImpressions = quizzes.reduce(
      (sum, quiz) => sum + quiz.impressions,
      0
    );

    res.json({
      data: {
        quizzes: totalQuizzes,
        questions: totalQuestions,
        impressions: totalImpressions,
      },
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user data" });
  }
});

// Trending Quizzes API
router.get("/trendingQuizzes", async (req, res) => {
  try {
    const { email } = req.query;
    const trendingQuizzes = await Quiz.find({ email })
      .sort({ impressions: -1 })
      .limit(6)
      .select("quizName impressions date");

    res.json({ data: trendingQuizzes });
  } catch (error) {
    console.error("Error fetching trending quizzes:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching trending quizzes" });
  }
});

module.exports = router;
