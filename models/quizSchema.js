const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  text: { type: String },
  imageURL: { type: String },
});

const questionSchema = new mongoose.Schema({
  question: { type: Object, required: true },
  ansOption: { type: Object, required: true },
  options: [[optionSchema]],
  timerType: { type: Object },
});

const quizSchema = new mongoose.Schema({
  email: { type: String, required: true },
  date: { type: Date, default: Date.now },
  impressions: { type: Number, default: 0 },
  quizName: { type: String, required: true },
  quizType: { type: String, required: true, enum: ["Poll Type", "Quiz Type"] },
  correctAnswers: { type: Object, default: {} },
  questions: { type: [questionSchema], default: () => [] },
});

module.exports = mongoose.model("Quiz", quizSchema);
