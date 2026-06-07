const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String },
  content: { type: String },
  order: { type: Number, required: true },

  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section",
    required: true
  }
});

module.exports = mongoose.model("Lesson", lessonSchema);

