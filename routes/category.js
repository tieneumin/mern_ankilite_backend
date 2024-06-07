const express = require("express");
const {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");
const { isAdmin } = require("../middleware/auth");

const router = express.Router();

// GET /categories
router.get("/", async (req, res) => {
  try {
    res.status(200).send(await getCategories());
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// POST /categories
router.post("/", isAdmin, async (req, res) => {
  try {
    res.status(200).send(await addCategory(req.body.name));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// PUT /categories/:id
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getCategory(id);
    if (user) {
      res.status(200).send(await updateCategory(id, req.body.name));
    } else {
      res.status(404).send({ message: "Category not found." });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// DELETE /categories/:id
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getCategory(id);
    if (user) {
      res.status(200).send(await deleteCategory(id));
    } else {
      res.status(404).send({ message: "Category not found." });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
