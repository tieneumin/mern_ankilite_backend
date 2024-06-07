const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cardSchema = new Schema({
  fTitle: { type: String, required: true },
  fDesc: String,
  fImage: String,
  bTitle: { type: String, required: true },
  bDesc: String,
  bImage: String,
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Card = model("Card", cardSchema);

module.exports = Card;
