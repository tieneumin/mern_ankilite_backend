const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Category = model("Category", categorySchema);

module.exports = Category;
