const express = require("express");
const {
  getCards,
  getCard,
  addCard,
  updateCard,
  deleteCard,
} = require("../controllers/card");
const { isLoggedIn, isCreatorOrAdmin } = require("../middleware/auth");

const router = express.Router();

// GET /cards
router.get("/", async (req, res) => {
  try {
    const {
      category,
      // page, perPage
      creator,
    } = req.query;
    res.status(200).send(
      await getCards(
        category,
        //  page, perPage
        creator
      )
    );
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// GET /cards/:id
router.get("/:id", async (req, res) => {
  try {
    const card = await getCard(req.params.id);
    if (card) {
      res.status(200).send(card);
    } else {
      res.status(404).send({ message: "Card not found." });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// POST /cards
router.post("/", isLoggedIn, async (req, res) => {
  try {
    const { fTitle, fDesc, fImage, bTitle, bDesc, bImage, category } = req.body;
    res
      .status(200)
      .send(
        await addCard(
          fTitle,
          fDesc,
          fImage,
          bTitle,
          bDesc,
          bImage,
          category,
          req.user._id
        )
      );
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// PUT /cards/:id
router.put("/:id", isCreatorOrAdmin, async (req, res) => {
  try {
    const { fTitle, fDesc, fImage, bTitle, bDesc, bImage, category } = req.body;
    const { id } = req.params;
    const card = await getCard(id);
    if (card) {
      res
        .status(200)
        .send(
          await updateCard(
            id,
            fTitle,
            fDesc,
            fImage,
            bTitle,
            bDesc,
            bImage,
            category
          )
        );
    } else {
      res.status(404).send({ message: "Card not found." });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// DELETE /cards/:id
router.delete("/:id", isCreatorOrAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const card = await getCard(id);
    if (card) {
      res.status(200).send(await deleteCard(id));
    } else {
      res.status(404).send({ message: "Card not found." });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
