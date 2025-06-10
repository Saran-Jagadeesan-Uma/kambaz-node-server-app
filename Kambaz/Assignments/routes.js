import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.post("/api/assignments", (req, res) => {
    const newAssignment = dao.createAssignment(req.body);
    res.json(newAssignment);
  });

  app.get("/api/assignments", (req, res) => {
    res.json(dao.findAllAssignments());
  });

  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    res.json(dao.findAssignmentsForCourse(cid));
  });

  app.put("/api/assignments/:aid", (req, res) => {
    try {
      const updated = dao.updateAssignment(req.params.aid, req.body);
      res.json(updated);
    } catch (e) {
      res.status(404).send(e.message);
    }
  });

  app.delete("/api/assignments/:aid", (req, res) => {
    dao.deleteAssignment(req.params.aid);
    res.sendStatus(204);
  });
}
