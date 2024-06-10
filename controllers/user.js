const User = require("../models/user");
const { getUserByUsername, getUserByEmail } = require("./auth");

// GET /users
const getUsers = async () => {
  return await User.find().sort({ createdAt: 1 }); // sort by oldest to newest
};

// GET /user
const getUser = async (id) => {
  return await User.findById(id);
};

// PUT /users/:id
const updateUser = async (id, role) => {
  return await User.findByIdAndUpdate(id, { role }, { new: true });
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
};
