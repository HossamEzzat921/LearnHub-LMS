
const asyncHandler = require("express-async-handler");
const Section = require("../models/Section");
const Lesson = require("../models/Lesson");




//Add Lessons To Section

const addLesson = asyncHandler(async (req, res) => {

  const { title, order, videoUrl, content, section } = req.body;

  if ( !section) {
    return res.status(400).json({ message: "Section is required" });
  }

  const selectedSection = await Section.findById(section).populate("lessons");

  if (!selectedSection) {
    return res.status(404).json({ message: "Section not found" });
  }
 // 🔥 calculate next order
  const nextOrder = selectedSection.lessons.length + 1;
  const lessonTitle = title ? title: `Lesson ${nextOrder} `
  const lesson = await Lesson.create({
    title:lessonTitle,
    order:nextOrder,
    videoUrl,
    content,
    section
  });


  await Section.findByIdAndUpdate(section, {
    $push: { lessons: lesson._id }
  });

  res.status(201).json(lesson);
});


//Update lesson ON section
const updateLesson = asyncHandler(async (req, res) => {
  const { lessonId, title, order, videoUrl, content } = req.body;

  if (!lessonId || !title || !order) {
    return res.status(400).json({ message: "All data is required" });
  }

  const lesson = await Lesson.findById(lessonId);

  if (!lesson) {
    return res.status(404).json({ message: "Lesson not found" });
  }

  lesson.title = title;
  lesson.order = order;
  lesson.videoUrl = videoUrl;
  lesson.content = content;

  await lesson.save();

  res.json(lesson);
});

//Delete Lesson From Section
const deleteLesson = asyncHandler(async (req, res) => {
  const { lessonId, sectionId } = req.body;

  if (!lessonId || !sectionId) {
    return res.status(400).json({ message: "lessonId and sectionId required" });
  }

  const lesson = await Lesson.findById(lessonId);

  if (!lesson) {
    return res.status(404).json({ message: "Lesson not found" });
  }

  // remove from section
  await Section.findByIdAndUpdate(sectionId, {
    $pull: { lessons: lessonId }
  });

  // delete lesson
  await Lesson.findByIdAndDelete(lessonId);

  res.json({ message: "Lesson deleted successfully" });
});


module.exports = {
  updateLesson,
  deleteLesson,
  addLesson
}

