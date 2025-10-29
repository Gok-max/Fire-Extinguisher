const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ["image", "video"], required: true }, // type of media
  url: { type: String, required: true }, // saved path (uploaded file or URL)
  category: { type: String, required: true }, // ✅ New category field
});

module.exports = mongoose.model("Service", serviceSchema);
