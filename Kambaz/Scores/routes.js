import * as dao from "./dao.js";

export default function AttemptRoutes(app) {
  app.post("/api/quizzes/:quizId/attempts", async (req, res) => {
    try {
      const attempt = await dao.submitAttempt(req.body);
      res.json(attempt);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });

  app.get("/api/quizzes/:quizId/attempts/:studentId", async (req, res) => {
    const { studentId, quizId } = req.params;
    try {
      const attempts = await dao.findAttemptsByStudentAndQuiz(studentId, quizId);
      res.json(attempts);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });

  app.get("/api/quizzes/:quizId/attempts/:studentId/count", async (req, res) => {
    const { studentId, quizId } = req.params;
    try {
      const count = await dao.countAttemptsForStudentQuiz(studentId, quizId);
      res.json({ count });
    } catch (e) {
      res.status(500).send(e.message);
    }
  });
}
