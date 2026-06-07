const mongoose = require('mongoose')


const courseSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: {
        type: String,
        enum: [
            "mathematics",
            "science",
            "languages",
            "programming",
            "business",
            "arts",
            "history",
            "music",
        ],
        required: true

    },
    level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'all-levels'],
        required: true

    },

    thumbnail: {
        type: String
    },
    price: { type: Number, required: true },

    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isPublished: { type: Boolean, required: true },
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft"
    },
    courseCurriculum: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
        }
    ]

}, { timestamps: true })

module.exports = mongoose.model("Course", courseSchema)