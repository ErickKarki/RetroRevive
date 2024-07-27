const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    // title: { type: String, required: true, unique: true },
    // desc: { type: String, required: true },
    // img: { type: String, required: true },
    // categories: { type: Array },
    // size: { type: Array },
    // color: { type: Array },
    // price: { type: Number, required: true },
    // inStock: { type: Boolean, default: true },

    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    img: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
