import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export const getUserEnrollments = async (userId) => {
  const { enrollments, courses } = Database;

  const userEnrollments = enrollments
    .filter((enrollment) => enrollment.user === userId)
    .map((enrollment) => {
      const course = courses.find((c) => c._id === enrollment.course);
      return course;
    });

  return userEnrollments;
};

export const toggleUserInCourse = async (userId, courseId) => {
  const { enrollments } = Database;
  const existing = enrollments.find(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );

  if (existing) {
    Database.enrollments = enrollments.filter(
      (enrollment) =>
        !(enrollment.user === userId && enrollment.course === courseId)
    );
  } else {
    enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
  }

  return getUserEnrollments(userId);
};

export const enrollUserInCourse = (userId, courseId) => {
  const newEnrollment = {
    _id: uuidv4(),
    user: userId,
    course: courseId,
  };
  Database.enrollments.push(newEnrollment);
  return newEnrollment;
};
