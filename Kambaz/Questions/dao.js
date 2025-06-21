import QuestionModel from "./model.js";
import QuizModel from "../Quizzes/model.js";

export const createQuestion = async (req, res) => {
  const { quizId } = req.params;

  try {
    // Remove quiz field from body if present
    const questionData = { ...req.body };
    delete questionData.quiz;

    // Create question with quizId from params
    const newQuestion = await QuestionModel.create({
      ...questionData,
      quiz: quizId,
    });

    // Link question ID to the quiz document
    await QuizModel.findByIdAndUpdate(quizId, {
      $push: { questions: newQuestion._id },
    });

    res.json(newQuestion);
  } catch (err) {
    console.error("Failed to create question:", err);
    res.status(500).send("Failed to create question");
  }
};

export const findQuestionsForQuiz = async (req, res) => {
  const { quizId } = req.params;
  try {
    const quiz = await QuizModel.findById(quizId).populate("questions");
    if (!quiz) return res.status(404).send("Quiz not found");
    res.json(quiz.questions);
  } catch (err) {
    res.status(500).send("Error fetching questions");
  }
};

export const updateQuestion = async (req, res) => {
  const { questionId } = req.params;
  try {
    const updated = await QuestionModel.findByIdAndUpdate(
      questionId,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).send("Error updating question");
  }
};

export const deleteQuestion = async (req, res) => {
  const { questionId } = req.params;
  try {
    await QuestionModel.findByIdAndDelete(questionId);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send("Error deleting question");
  }
};
