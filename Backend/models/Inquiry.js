import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },

  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"],
  },

  city: {
    type: String,
    trim: true,
  },

  state: {
    type: String,
    trim: true,
  },

  message: {
    type: String,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Inquiry", inquirySchema);
