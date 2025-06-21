import quizModel from "./model.js";

export const createQuiz = async (courseId, quiz) => {
  console.log("📥 Creating quiz for course:", courseId);
  const createdQuiz = await quizModel.create({ ...quiz, course: courseId });
  console.log("✅ Quiz created:", createdQuiz);
  return createdQuiz;
};

export const findQuizzesForCourse = async (courseId) => {
  const quizzes = await quizModel.find({ course: courseId });
  return quizzes;
};

export const findQuizById = async (quizId) => {
  const quiz = await quizModel.findById(quizId).populate("questions"); // ✅ FIXED
  return quiz;
};

export const updateQuiz = async (quizId, quiz) => {
  return await quizModel.updateOne({ _id: quizId }, { $set: quiz });
};

export const deleteQuiz = async (quizId) => {
  return await quizModel.deleteOne({ _id: quizId });
};
