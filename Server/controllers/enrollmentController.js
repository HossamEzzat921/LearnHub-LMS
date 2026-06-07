const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const enrollCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { studentId } = req.body;

  if (!studentId || !courseId) {
    return res.status(400).json({
      message: "Student ID and Course ID are required",
    });
  }

  const student = await User.findById(studentId);
  const course = await Course.findById(courseId);

  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  if (!course) {
    return res.status(404).json({
      message: "Course not found",
    });
  }

  const existingEnrollment = await Enrollment.findOne({
    student: studentId,
    course: courseId,
  });

  if (existingEnrollment) {
    return res.status(400).json({
      message: "Already enrolled",
    });
  }

  const enrollment = await Enrollment.create({
    student: studentId,
    course: courseId,
  });

  res.status(201).json(enrollment);
});
const getStudentEnrollments = asyncHandler(async (req, res) => {
  const { studentId } = req.params;

  const enrollments = await Enrollment.find({
    student: studentId,
  })
    .populate("course")
    .lean();

  res.json(enrollments);
});
const getEnrollment = asyncHandler(async (req, res) => {
  const { enrollmentId } = req.params;

  const enrollment = await Enrollment.findById(
    enrollmentId
  )
    .populate("student")
    .populate("course")
    .lean();

  if (!enrollment) {
    return res.status(404).json({
      message: "Enrollment not found",
    });
  }

  res.json(enrollment);
});
const updateProgress = asyncHandler(async (req, res) => {
  const { enrollmentId } = req.params;
  const { progress } = req.body;

  const enrollment = await Enrollment.findById(
    enrollmentId
  );

  if (!enrollment) {
    return res.status(404).json({
      message: "Enrollment not found",
    });
  }

  enrollment.progress = progress;

  if (progress >= 100) {
    enrollment.completed = true;
  }

  await enrollment.save();

  res.json(enrollment);
});
const deleteEnrollment = asyncHandler(async (req, res) => {
  const { enrollmentId } = req.params;

  const enrollment = await Enrollment.findById(
    enrollmentId
  );

  if (!enrollment) {
    return res.status(404).json({
      message: "Enrollment not found",
    });
  }

  await enrollment.deleteOne();

  res.json({
    message: "Enrollment removed",
  });
});
const getTeacherEnrollments = asyncHandler(async (req, res) => {
   const { teacherId } = req.params;

  // 1. get teacher courses
  const courses = await Course.find({ teacher: teacherId }).select("_id");

  const courseIds = courses.map((c) => c._id);

  // 2. get enrollments for these courses
  const enrollments = await Enrollment.find({
    course: { $in: courseIds },
  })
    .populate("student", "username email")
    .populate("course", "title price")
    .lean();

  res.json(enrollments);
});
module.exports = {
  enrollCourse,
  getStudentEnrollments,
  getEnrollment,
  updateProgress,
  deleteEnrollment,
  getTeacherEnrollments
};