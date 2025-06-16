import model from "./model.js";

export async function createModule(module) {
  const newModule = { ...module, lessons: [] };
  return await model.create(newModule);
}

export async function findModulesForCourse(courseId) {
  return await model.find({ course: courseId });
}

export async function updateModule(moduleId, moduleUpdates) {
  return await model.findByIdAndUpdate(moduleId, moduleUpdates, { new: true });
}

export async function deleteModule(moduleId) {
  return await model.deleteOne({ _id: moduleId });
}
