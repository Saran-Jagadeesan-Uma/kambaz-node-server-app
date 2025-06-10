import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";

export default function CourseRoutes(app) {
  console.log("CourseRoutes function called.");

  app.get("/api/courses", (req, res) => {
    console.log("GET /api/courses route hit.");
    const courses = dao.findAllCourses();
    console.log("Courses retrieved from DAO:", courses);
    res.send(courses);
    console.log("Response sent for /api/courses.");
  });
  app.delete("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const status = dao.deleteCourse(courseId);
    res.send(status);
  });
  app.put("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  });
  app.get("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const modules = modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });
  app.post("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = modulesDao.createModule(module);
    res.send(newModule);
  });
}
