const express = require("express");
const { signUpUser, loginUser } = require("../controllers/auth");

const router = express.Router();

// POST /auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    res.status(200).send(await signUpUser(username, email, password));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// POST /auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    res.status(200).send(await loginUser(email, password));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
