import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";

export default function CourseRoutes(app) {
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await dao.findAllCourses();
      res.json(courses);
    } catch (error) {
      console.error("❌ Failed to fetch courses:", error);
      res.status(500).send(error.message);
    }
  });

  app.post("/api/courses", async (req, res) => {
    try {
      console.log("📥 Creating course:", req.body);
      const newCourse = await dao.createCourse(req.body);
      console.log("✅ Created course:", newCourse);
      res.json(newCourse);
    } catch (error) {
      console.error("❌ Error creating course:", error);
      res.status(500).send(error.message);
    }
  });

  app.get("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const { courseId } = req.params;
      console.log(`📥 Fetching modules for course: ${courseId}`);
      const modules = await modulesDao.findModulesForCourse(courseId);
      res.json(modules);
    } catch (error) {
      console.error("❌ Failed to fetch modules:", error);
      res.status(500).send(error.message);
    }
  });

  app.post("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const module = { ...req.body, course: courseId };

    console.log("📥 Creating module for course:", courseId);
    console.log("Module payload:", module);

    try {
      const newModule = await modulesDao.createModule(module);
      console.log("✅ Module created:", newModule);
      res.json(newModule);
    } catch (error) {
      console.error("❌ Error creating module:", error);
      if (error.name === "ValidationError") {
        res.status(400).send(error.message);
      } else {
        res.status(500).send(error.message);
      }
    }
  });

  app.delete("/api/courses/:courseId", async (req, res) => {
    try {
      const { courseId } = req.params;
      console.log(`🗑️ Deleting course: ${courseId}`);
      const status = await dao.deleteCourse(courseId);
      res.send(status);
    } catch (error) {
      console.error("❌ Error deleting course:", error);
      res.status(500).send(error.message);
    }
  });

  app.put("/api/courses/:courseId", async (req, res) => {
    try {
      const { courseId } = req.params;
      const courseUpdates = req.body;
      console.log("📝 Updating course:", courseId, "Updates:", courseUpdates);
      const status = await dao.updateCourse(courseId, courseUpdates);
      res.send(status);
    } catch (error) {
      console.error("❌ Error updating course:", error);
      res.status(500).send(error.message);
    }
  });
}
