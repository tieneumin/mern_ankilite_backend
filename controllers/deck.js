const Deck = require("../models/deck");

// GET /decks
const getDecks = async (category, creator = "", page = 1, perPage = 9) => {
  // originally: category, page = 1, perPage = 100
  let filters = {};
  if (category) filters.category = category;
  if (creator !== "") filters.creator = creator;

  // console.log(filters);

  // // sort list by latest added
  // let latestAdded = { _id: -1 };

  /* 
      Pagination
      .skip() // skips given amount
      .limit() // limits items returned
    */
  return await Deck.find(filters)
    .populate("category") // model prop
    .populate({
      path: "creator",
      select: "username",
    })
    .sort({ _id: -1 }); // sort by latest added
  // .skip((page - 1) * perPage)
  // .limit(perPage);
};

// GET /decks/:id
const getDeck = async (id) => {
  return await Deck.findById(id)
    .populate("category") // model prop
    .populate({
      path: "creator",
      select: "username",
    })
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
