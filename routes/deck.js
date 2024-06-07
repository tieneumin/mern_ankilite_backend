const express = require("express");
const {
  getDecks,
  getDeck,
  addDeck,
  updateDeck,
  deleteDeck,
} = require("../controllers/deck");
const { isLoggedIn, isCreatorOrAdmin } = require("../middleware/auth");

const router = express.Router();

// GET /decks
router.get("/", async (req, res) => {
  try {
    const {
      category,
      // page, perPage
      creator,
    } = req.query;
    res.status(200).send(
      await getDecks(
        category,
        //  page, perPage
        creator
      )
    );
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// GET /decks/:id
router.get("/:id", async (req, res) => {
  try {
    const deck = await getDeck(req.params.id);
    if (deck) {
      res.status(200).send(deck);
    } else {
      res.status(404).send({ message: "Deck not found." });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// POST /decks
router.post("/", isLoggedIn, async (req, res) => {
  try {
    const { title, description, category } = req.body;
    res
      .status(200)
      .send(await addDeck(title, description, category, req.user.id));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// PUT /decks/:id
router.put("/:id", isCreatorOrAdmin, async (req, res) => {
  try {
    const { title, description, cards, category } = req.body;
    const { id } = req.params;
    const deck = await getDeck(id);
    if (deck) {
      res
        .status(200)
        .send(await updateDeck(id, title, description, cards, category));
    } else {
      res.status(404).send({ message: "Deck not found." });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// DELETE /decks/:id
router.delete("/:id", isCreatorOrAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deck = await getDeck(id);
    if (deck) {
      res.status(200).send(await deleteDeck(id));
    } else {
      res.status(404).send({ message: "Deck not found." });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
