import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
  app.put("/api/modules/:moduleId", (req, res) => {
    const { moduleId } = req.params;
    const moduleUpdates = req.body;

    try {
      const updated = modulesDao.updateModule(moduleId, moduleUpdates);
      res.json(updated);
    } catch (e) {
      console.error("Update failed:", e.message);
      res.status(500).send(`Update failed: ${e.message}`);
    }
  });

  app.delete("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    try {
      await modulesDao.deleteModule(moduleId);
      res.sendStatus(204);
    } catch (err) {
      console.error("Error deleting module:", err);
      res.status(500).send("Error deleting module");
    }
  });
}
