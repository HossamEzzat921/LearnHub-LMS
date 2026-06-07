const Course = require("../models/Course");
const asyncHandler = require("express-async-handler");
const Section = require("../models/Section");
const Lesson = require("../models/Lesson");



const getSectionsByCourse = asyncHandler(async (req, res) => {
   const { courseId } = req.params;
  const sections = await Section.find({ course: courseId }).lean();
  res.json(sections);
});

//add section to course
const addSection = asyncHandler(async (req, res) => {
  const { title, course , order } = req.body;

  if ( !course) {
    return res.status(400).json({ message: "course is required" });
  }

  const selectedCourse = await Course.findById(course).populate("courseCurriculum");

  if (!selectedCourse) {
    return res.status(404).json({ message: "Course not found" });
  }

  // 🔥 calculate next order
  const nextOrder = selectedCourse.courseCurriculum.length + 1;
  const sectionTitle = title ? title: `Section ${nextOrder} `

  const section = await Section.create({
    title:sectionTitle,
    order: nextOrder,
    course
  });

  await Course.findByIdAndUpdate(course, {
    $push: { courseCurriculum: section._id }
  }).populate({
      path: "courseCurriculum",
      options: { sort: { order: 1 } },
      populate: {
        path: "lessons",
        options: { sort: { order: 1 } }
      }
    })
    .lean();;

  res.status(201).json(section);
});


//Update section ON course
const updateSection = asyncHandler(async (req, res) => {
  const { sectionId, title, order } = req.body;

 if (!sectionId || !title || order === undefined){
    return res.status(400).json({ message: "All data is required" });
  }

  const section = await Section.findById(sectionId);

  if (!section) {
    return res.status(404).json({ message: "Section not found" });
  }

  section.title = title;
  section.order = order;

  await section.save();

  res.json(section);
});

//Delete Section From Course

const deleteSection = asyncHandler(async (req, res) => {
  const { sectionId, courseId } = req.body;

  if (!sectionId || !courseId) {
    return res.status(400).json({ message: "SectionId and courseId required" });
  }

  const section = await Section.findById(sectionId);

  if (!section) {
    return res.status(404).json({ message: "Section not found" });
  }

  // delete all lessons inside section
  await Lesson.deleteMany({ section: sectionId });

  // remove section from course
  await Course.findByIdAndUpdate(courseId, {
    $pull: { courseCurriculum: sectionId }
  });

  // delete section
  await Section.findByIdAndDelete(sectionId);

  res.json({ message: "Section deleted successfully" });
});


module.exports={
    deleteSection,
    updateSection,
    addSection,
    getSectionsByCourse
}