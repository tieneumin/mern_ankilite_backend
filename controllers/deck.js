const Deck = require("../models/deck");

// GET /decks
const getDecks = async (category) => {
  let filters = {};
  if (category) filters.category = category;

  return await Deck.find(filters)
    .populate("category")
    .populate({ path: "creator", select: "username" })
    .sort({ _id: -1 });
};

// GET /decks/:id
const getDeck = async (id) => {
  return await Deck.findById(id)
    .populate("category")
    .populate({ path: "creator", select: "username" })
    .populate("cards");
};

// POST /decks
const addDeck = async (title, description, category, creator) => {
  const newDeck = new Deck({
    title,
    description,
    category,
    creator,
    cards: [],
  });
  await newDeck.save();
  return newDeck;
};

// PUT /decks/:id
const updateDeck = async (id, title, description, cards, category) => {
  return await Deck.findByIdAndUpdate(
    id,
    { title, description, cards, category },
    { new: true }
  );
};

// DELETE /decks/:id
const deleteDeck = async (id) => {
  return await Deck.findByIdAndDelete(id);
};

module.exports = {
  addDeck,
  getDecks,
  getDeck,
  updateDeck,
  deleteDeck,
};
