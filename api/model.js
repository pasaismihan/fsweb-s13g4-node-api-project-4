const uuid = require("uuid");

function createId() {
  return uuid.v1();
}

function initialUsers() {
  return [{ id: 1, username: "admin", password: "root" }];
}

let allUsers = initialUsers();

function getAllUsers() {
  return allUsers;
}

function getUserById(id) {
  const user = allUsers.find((user) => user.id == id);
  return user;
}

function insert(user) {
  user.id = createId();
  allUsers.push(user);
  return user;
}

function checkLogin(user) {
  let isFinded = null;
  for (let i = 0; i < allUsers.length; i++) {
    const item = allUsers[i];
    if (
      user.kullaniciadi == item.kullaniciadi &&
      user.password == item.password
    ) {
      isFinded = true;
      break;
    }
  }
  return isFinded;
}

module.exports = {
  getAllUsers,
  getUserById,
  insert,
  checkLogin,
};
