const express = require("express");
const router = express.Router();
const Quiz = require("../models/quizSchema.js");

// Create Quiz API
router.post("/createquiz", async (req, res) => {
  try {
    const { email, quizName, quizType, questions } = req.body;
    const newQuiz = new Quiz({
      email,
      quizName,
      quizType,
      questions,
      date: new Date(),
    });

    await newQuiz.save();
    res.status(201).json({ message: "Quiz created successfully", id: newQuiz._id });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
});

// Delete Quiz API
router.delete("/:quizId", async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const quiz = await Quiz.findByIdAndDelete(quizId);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    res.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
});

module.exports = router;
