const express = require("express");
const { getUsers, getUser, updateUser } = require("../controllers/user");
const { isAdmin } = require("../middleware/auth");

const router = express.Router();

// GET /users
router.get("/", isAdmin, async (req, res) => {
  try {
    res.status(200).send(await getUsers());
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// PUT /users/:id
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUser(id);
    if (user) {
      res.status(200).send(await updateUser(id, req.body.role));
    } else {
      res.status(404).send({ message: "User not found." });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
