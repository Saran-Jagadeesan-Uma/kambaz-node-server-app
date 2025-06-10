import db from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export const createUser = (user) => {
  const newUser = { ...user, _id: uuidv4() };
  db.users.push(newUser);
  return newUser;
};

export const findAllUsers = () => db.users;

export const findUserById = (userId) =>
  db.users.find((user) => user._id === userId);

export const findUserByUsername = (username) =>
  db.users.find((user) => user.username === username);

export const findUserByCredentials = (username, password) => {
  const foundUser = db.users.find(
    (user) => user.username === username && user.password === password
  );

  if (foundUser) {
    console.log("DAO: User found by credentials:", foundUser.username);
  } else {
    console.log("DAO: User NOT found for the provided credentials.");
  }
  return foundUser;
};

export const updateUser = (userId, user) => {
  const userIndex = db.users.findIndex((u) => u._id === userId);
  if (userIndex !== -1) {
    db.users[userIndex] = { ...db.users[userIndex], ...user };
    return db.users[userIndex];
  }
  return null;
};

export const deleteUser = (userId) => {
  db.users = db.users.filter((u) => u._id !== userId);
};
