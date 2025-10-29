import mongoose from "mongoose";

const serviceVideoSchema = new mongoose.Schema({
  title: String,
  videoUrl: String, // YouTube or uploaded video file path
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("ServiceVideo", serviceVideoSchema);
