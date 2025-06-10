import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: uuidv4() };
  Database.assignments = [...Database.assignments, newAssignment];
  return newAssignment;
}

export function findAllAssignments() {
  return Database.assignments;
}

export function findAssignmentsForCourse(courseId) {
  return Database.assignments.filter((a) => a.course === courseId);
}

export function updateAssignment(assignmentId, updates) {
  const index = Database.assignments.findIndex((a) => a._id === assignmentId);
  if (index === -1) throw new Error("Assignment not found");
  Database.assignments[index] = { ...Database.assignments[index], ...updates };
  return Database.assignments[index];
}

export function deleteAssignment(assignmentId) {
  Database.assignments = Database.assignments.filter(
    (a) => a._id !== assignmentId
  );
}
