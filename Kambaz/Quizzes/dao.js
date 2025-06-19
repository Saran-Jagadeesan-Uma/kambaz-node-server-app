import quizModel from "./model.js";

export const createQuiz = async (courseId, quiz) => {
  console.log("📥 Creating quiz for course:", courseId);
  console.log("📝 Quiz data:", quiz);
  const createdQuiz = await quizModel.create({ ...quiz, course: courseId });
  console.log("✅ Quiz created:", createdQuiz);
  return createdQuiz;
};

export const findQuizzesForCourse = async (courseId) => {
  console.log("🔍 Finding quizzes for course:", courseId);
  const quizzes = await quizModel.find({ course: courseId });
  console.log(`📄 Found ${quizzes.length} quiz(zes)`);
  return quizzes;
};

export const findQuizById = async (quizId) => {
  console.log("🔍 Finding quiz by ID:", quizId);
  const quiz = await quizModel.findById(quizId);
  console.log("📄 Found quiz:", quiz);
  return quiz;
};

export const updateQuiz = async (quizId, quiz) => {
  console.log("✏️ Updating quiz:", quizId);
  console.log("🔁 New quiz data:", quiz);
  const status = await quizModel.updateOne({ _id: quizId }, { $set: quiz });
  console.log("✅ Update status:", status);
  return status;
};

export const deleteQuiz = async (quizId) => {
  console.log("🗑️ Deleting quiz:", quizId);
  const status = await quizModel.deleteOne({ _id: quizId });
  console.log("✅ Deletion status:", status);
  return status;
};
