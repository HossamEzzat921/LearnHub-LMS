const mongoose = require('mongoose')



const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  order: { type: Number, required: true },

 course: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "Course",
     required: true
   },

  lessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson"
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model('Section',sectionSchema)
