const Card = require("../models/card");
const Deck = require("../models/deck");

// GET /cards
const getCards = async (category, creator = "", page = 1, perPage = 9) => {
  // originally: category, page = 1, perPage = 100
  let filters = {};
  if (category) filters.category = category;

  // console.log(filters);

  // // sort list by latest added
  // let latestAdded = { _id: -1 };

  /* 
      Pagination
      .skip() // skips given amount
      .limit() // limits items returned
    */
  return await Card.find(filters)
    .populate("category")
    .populate({
      path: "creator",
      select: "username",
    })
    .sort({ _id: -1 }); // sort by latest added
  // .skip((page - 1) * perPage)
  // .limit(perPage);
};

// GET /cards/:id
const getCard = async (id) => {
  return await Card.findById(id);
};

// POST /cards
const addCard = async (
  fTitle,
  fDesc,
  fImage,
  bTitle,
  bDesc,
  bImage,
  category,
  creator
) => {
  const newCard = new Card({
    fTitle,
    fDesc,
    fImage,
    bTitle,
    bDesc,
    bImage,
    category,
    creator,
  });
  await newCard.save();
  return newCard;
};

// PUT /cards/:id
const updateCard = async (
  id,
  fTitle,
  fDesc,
  fImage,
  bTitle,
  bDesc,
  bImage,
  category
) => {
  return await Card.findByIdAndUpdate(
    id,
    { fTitle, fDesc, fImage, bTitle, bDesc, bImage, category },
    { new: true }
  );
};

// DELETE /cards/:id
const deleteCard = async (id) => {
  const decks = await Deck.find({ category: id });
  if (decks.length > 0) throw new Error("Card is currently in use.");
  return await Card.findByIdAndDelete(id);
};

module.exports = {
  addCard,
  getCards,
  getCard,
  updateCard,
  deleteCard,
};
