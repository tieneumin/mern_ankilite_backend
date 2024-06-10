const Category = require("../models/category");
const Card = require("../models/card");
const Deck = require("../models/deck");

// GET /categories
const getCategories = async () => {
  return await Category.find().sort({ name: 1 }); // alphabetic sort
};

// GET /category
const getCategory = async (id) => {
  return await Category.findById(id);
};

// POST /categories
const addCategory = async (name) => {
  const newCategory = new Category({ name });
  await newCategory.save();
  return newCategory;
};

// PUT /categories/:id
const updateCategory = async (id, name) => {
  return await Category.findByIdAndUpdate(id, { name }, { new: true });
};

// DELETE /categories/:id
const deleteCategory = async (id) => {
  const cards = await Card.find({ category: id });
  const decks = await Deck.find({ category: id });
  if (cards.length > 0 || decks.length > 0)
    throw new Error("Category is currently in use.");
  return await Category.findByIdAndDelete(id);
};

module.exports = {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
