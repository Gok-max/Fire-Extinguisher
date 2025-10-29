const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  name: String,
  size: String,
  price: Number,
  gallery: [String],
  specifications: [{ name: String, value: String }],
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    keypoints: [String], 
    image: { type: String },
    video: { type: String },
    variants: [variantSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
