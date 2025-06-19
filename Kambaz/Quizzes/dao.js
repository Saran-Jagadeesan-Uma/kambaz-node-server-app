import quizModel from "./model.js";

export const createQuiz = (courseId, quiz) =>
  quizModel.create({ ...quiz, course: courseId });

export const findQuizzesForCourse = (courseId) =>
  quizModel.find({ course: courseId });

export const findQuizById = (quizId) =>
  quizModel.findById(quizId);

export const updateQuiz = (quizId, quiz) =>
  quizModel.updateOne({ _id: quizId }, { $set: quiz });

export const deleteQuiz = (quizId) =>
  quizModel.deleteOne({ _id: quizId });
