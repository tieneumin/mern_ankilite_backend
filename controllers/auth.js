const User = require("../models/user");
const jwt = require("jsonwebtoken"); // https://www.npmjs.com/package/jsonwebtoken
const bcrypt = require("bcrypt"); // https://www.npmjs.com/package/bcrypt
const { JWT_PRIVATE_KEY } = require("../config");

const getUserByUsername = async (username) => {
  return await User.findOne({ username });
};
const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const generateUserToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    JWT_PRIVATE_KEY,
    {
      expiresIn: "30d",
    }
  );
};

// POST /auth/signup
const signUpUser = async (username, email, password) => {
  // 1. validate input
  const error = [];

  const usernameTaken = await getUserByUsername({ username });
  if (usernameTaken) error.push("Username has already been taken.");

  const emailInUse = await getUserByEmail(email);
  if (emailInUse) error.push("Email is already in use.");

  if (error.length > 0) throw new Error(error);

  // 2. create new user
  const newUser = new User({
    username,
    email,
    password: bcrypt.hashSync(password, 10),
  });
  await newUser.save();

  // 3. generate JWT
  const token = generateUserToken(newUser);

  return {
    _id: newUser._id,
    username,
    email,
    role: newUser.role,
    token,
  };
};

// POST /auth/login
const loginUser = async (email, password) => {
  /// 1. check if user exists
  const user = await getUserByEmail(email);
  if (!user) throw new Error("Invalid email or password.");

  // 2. check if passwords match
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) throw new Error("Invalid email or password.");

  // 3. generate JWT
  const token = generateUserToken(user);

  return {
    _id: user._id,
    username: user.username,
    email,
    role: user.role,
    token,
  };
};

module.exports = {
  getUserByUsername,
  getUserByEmail,
  signUpUser,
  loginUser,
};
