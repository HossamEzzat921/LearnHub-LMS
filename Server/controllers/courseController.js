const Course = require("../models/Course");
const asyncHandler = require("express-async-handler");
const Section = require("../models/Section");


const fs = require('fs');
const path = require('path');
//Get All Courses
const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find().lean();
  res.json(courses);
});


//Get All Courses for Specific Teacher
const getAllCoursesByTeacherId = asyncHandler(async (req, res) => {
  const { teacherId } = req.params;

  const courses = await Course.find({
    teacher: teacherId,
  }).lean();

  res.json(courses);
});

// Single Course
const getCourseWithCurriculum = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  const course = await Course.findById(courseId)
  .populate({
      path: "teacher",
      select: "username email" // choose fields you want
    })
    .populate({
      path: "courseCurriculum",
      options: { sort: { order: 1 } },
      populate: {
        path: "lessons",
        options: { sort: { order: 1 } }
      }
    })
    .lean();

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  res.json(course);
});


//check course title before create
const checkCourseTitle = async (req, res) => {
  try {
    const { title } = req.query;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const existingCourse = await Course.findOne({ title: new RegExp(`^${title}$`, 'i') });
    res.json({ available: !existingCourse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createCourse = asyncHandler(async (req, res) => {
  const { title, description, price, category, level, teacher } = req.body;
  console.log(req.file)
  let thumbnail
  if (req.file) {
    thumbnail = req.file?.filename || ""
  }
  if (!title || !description || !price || !category || !level || !teacher) {
    return res.status(400).json({ message: "All data is required" });
  }
  const duplicate = await Course.findOne({ title }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "this course name is reserved" });
  }

  // 1. create course
  const course = await Course.create({
    title,
    description,
    price,
    category,
    level,
    teacher,
    thumbnail,
    status: "draft",
    isPublished: false
  });
  const newCourse = await course.save();
  // 2. create default section
  const defaultSection = await Section.create({
    title: "Introduction",
    order: 1,
    course: newCourse._id
  });

  // 3. link it to course
  newCourse.courseCurriculum.push(defaultSection._id);


  res.status(201).json(newCourse);
});

const updateCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params; // Get ID from URL
  const { title, description, price, category, level, status, isPublished } = req.body;
  const course = await Course.findById(courseId).populate({
    path: "courseCurriculum",
    populate: {
      path: "lessons" // This ensures 'lessons' is an array we can check
    }
  });
 
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  // VALIDATION: Check requirements if user is trying to publish
  if (status === "published" || isPublished === true) {
    const hasSections = course.courseCurriculum.length > 0;
    const hasLessons = hasSections && course.courseCurriculum.some(section => section.lessons && section.lessons.length > 0);

    if (!hasSections || !hasLessons) {
      return res.status(400).json({
        message: "Cannot publish: Course must have at least one section with at least one lesson."
      });
    }
  }
  // Check for duplicate title (if title is being changed)
  if (title && title !== course.title) {
    const duplicate = await Course.findOne({ title }).lean().exec();
    if (duplicate) {
      return res.status(409).json({ message: "This course name is already taken" });
    }
    course.title = title;
  }

  // Update Thumbnail logic
  if (req.file) {
    // Delete old thumbnail file if it exists
    if (course.thumbnail) {
      const oldPath = path.join(__dirname, '..', 'uploads', course.thumbnail);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }
    course.thumbnail = req.file.filename;
  }

  // Update other fields
  course.description = description || course.description;
  course.price = price !== undefined ? price : course.price;
  course.category = category || course.category;
  course.level = level || course.level;
  course.status = status || course.status;
  course.isPublished = isPublished !== undefined ? isPublished : course.isPublished;

  const updatedCourse = await course.save();
  await updatedCourse.populate({
    path: "courseCurriculum",
    options: { sort: { order: 1 } },
    populate: {
      path: "lessons",
      options: { sort: { order: 1 } }
    }
  });

  res.json(updatedCourse);
});

const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const course = await Course.findById(id);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  // 1. Delete thumbnail file from storage
  if (course.thumbnail) {
    const filePath = path.join(__dirname, '..', 'uploads', course.thumbnail);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  // 2. Cleanup Curriculum (Sections and Lessons)
  // Find all sections in this course
  const sections = await Section.find({ _id: { $in: course.courseCurriculum } });

  for (const section of sections) {
    // Delete lessons inside each section
    await Lesson.deleteMany({ _id: { $in: section.lessons } });
    // Delete the section itself
    await Section.findByIdAndDelete(section._id);
  }

  // 3. Delete the course
  await course.deleteOne();

  res.json({ message: `Course "${course.title}" and its content deleted` });
});

module.exports = {
  getAllCourses,
  createCourse,
  getCourseWithCurriculum,
  checkCourseTitle, updateCourse, deleteCourse,getAllCoursesByTeacherId
}
