import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js"; // Added import

export default function UserRoutes(app) {
  const createUser = (req, res) => {};
  const deleteUser = (req, res) => {};
  const findAllUsers = (req, res) => {};
  const findUserById = (req, res) => {};

  const updateUser = (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    dao.updateUser(userId, userUpdates);
    const updatedUser = dao.findUserById(userId);
    req.session["currentUser"] = updatedUser;
    res.json(updatedUser);
  };

  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }
    const newUser = dao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };

  const signin = (req, res) => {
    const { username, password } = req.body;
    const foundUser = dao.findUserByCredentials(username, password);
    if (foundUser) {
      req.session["currentUser"] = foundUser;
      res.json(foundUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = (req, res) => {
    const currentUserInSession = req.session["currentUser"];
    if (!currentUserInSession) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUserInSession);
  };

  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUserInSession = req.session["currentUser"];
      if (!currentUserInSession) {
        res.sendStatus(401);
        return;
      }
      userId = currentUserInSession._id;
    }
    const courses = courseDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };

  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }
    const newCourse = courseDao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users/current/courses", createCourse);
}
