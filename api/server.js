const express = require("express");

const server = express();
const userModel = require("./model");
const mw = require("./middleware");

server.use(express.json());

server.get("/api/users", (req, res, next) => {
  try {
    const allUsers = userModel.getAllUsers();
    res.json(allUsers);
  } catch (error) {
    next(error);
  }
});

server.get("/api/users/:id", (req, res, next) => {
  try {
    const user = userModel.getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Boyle bir user bulunamadi" });
    }
  } catch (error) {
    next(error);
  }
});

server.post(
  "/api/signup",
  mw.validatePayload,
  mw.validateUniqueUserName,
  (req, res, next) => {
    try {
      let insertedUser = userModel.insert({
        username: req.body.username,
        password: req.body.password,
      });
      res.status(201).json(insertedUser);
    } catch (error) {
      next(error);
    }
  }
);

server.post(
  "/api/login",
  mw.validatePayload,
  mw.validateLogin,
  (req, res, next) => {
    try {
      res.json({ message: `Welcome ${req.findedUser.username}` });
    } catch (error) {
      next(error);
    }
  }
);

server.get("/", (req, res) => {
  res.send(`<h1>Hello App!</h1>`);
});

module.exports = server;
