import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findModulesForCourse(courseId) {
  return Database.modules.filter((module) => module.course === courseId);
}

export function createModule(module) {
  const newModule = { ...module, _id: uuidv4() };
  Database.modules.push(newModule); // ✅ use push instead of replacing the array
  console.log("Module created:", newModule);
  return newModule;
}

export function deleteModule(moduleId) {
  const index = Database.modules.findIndex((m) => m._id === moduleId);
  if (index !== -1) {
    Database.modules.splice(index, 1); // ✅ in-place removal
    console.log(`Deleted module ${moduleId}`);
  }
}

export function updateModule(moduleId, moduleUpdates) {
  const module = Database.modules.find((module) => module._id === moduleId);
  if (!module) {
    console.error("Update failed: Module not found");
    throw new Error(`Module with ID ${moduleId} not found`);
  }
  Object.assign(module, moduleUpdates);
  console.log(`Updated module ${moduleId}`, module);
  return module;
}
