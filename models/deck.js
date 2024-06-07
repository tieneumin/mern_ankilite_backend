const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const deckSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
  createdAt: { type: Date, default: Date.now },
});

const Deck = model("Deck", deckSchema);

module.exports = Deck;
