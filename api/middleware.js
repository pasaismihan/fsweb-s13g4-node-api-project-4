const userModel = require("./model");

function validatePayload(req, res, next) {
  try {
    const { username, password } = req.body;
    if (username && password) {
      next();
    } else res.status(400).json({ message: "Eksik sifre veya kullanici adi" });
  } catch (error) {
    next(error);
  }
}

function validateUniqueUserName(req, res, next) {
  try {
    const { username } = req.body;
    const allUsers = userModel.getAllUsers();
    let isExistUser =
      allUsers.filter((x) => x.username === username).length > 0;
    if (isExistUser) {
      res.status(400).json({ message: "Boyle bir kullanici mevcut" });
    } else next();
  } catch (error) {
    next(error);
  }
}

function validateLogin(req, res, next) {
  try {
    let user = { username: req.body.username, password: req.body.password };
    let existUser = userModel.checkLogin(user);
    if (existUser) {
      req.findedUser = user;
      next();
    } else {
      res.status(400).json({ message: "login parametreleri hatali" });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validatePayload,
  validateUniqueUserName,
  validateLogin,
};
