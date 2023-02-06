const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Must be provided todo title"],
    trim: true,
  },
  content: {
    type: String,
    required: [true, "Must be provided todo description"],
  },
  id: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Todo", todoSchema);