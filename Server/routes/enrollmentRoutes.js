const express = require("express");
const router = express.Router();

const {
  enrollCourse,
  getStudentEnrollments,
  getEnrollment,
  updateProgress,
  deleteEnrollment,
  getTeacherEnrollments
} = require("../controllers/enrollmentController");

// Enroll in course
router.post(
  "/courses/:courseId/enroll",
  enrollCourse
);

// Get all enrollments for a student
router.get(
  "/students/:studentId",
  getStudentEnrollments
);

// Get single enrollment
router.get(
  "/:enrollmentId",
  getEnrollment
);

// Update progress
router.patch(
  "/:enrollmentId/progress",
  updateProgress
);

// Delete enrollment
router.delete(
  "/:enrollmentId",
  deleteEnrollment
);
router.get(
  "/teacher/:teacherId/enrollments",
  
 
  getTeacherEnrollments
);
module.exports = router;