const express = require('express')
const router = express.Router()
const veifyJWT = require("../middleware/verifyJWT")
const verifyRoles = require("../middleware/verifyRoles")
const { getAllCourses, createCourse, getCourseWithCurriculum, checkCourseTitle, updateCourse, deleteCourse ,getAllCoursesByTeacherId} = require('../controllers/courseController')




const multer = require('multer')
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1]
    const fileName = `course-${Date.now()}.${ext}`
    cb(null, fileName)
  }
})
const fileFilter = (req, file, cb) => {
  const imagType = file.mimetype.split('/')[0]
  if (imagType === 'image') {
    return cb(null, true)

  } else {
    return cb(new Error('I don\'t have a clue!'), false)
  }
}
const upload = multer({ storage: diskStorage, fileFilter })

// Add this ABOVE your .route('/') or it might get confused with /:courseId
router.get('/check-title', checkCourseTitle);
router.route('/')
  .get(getAllCourses)
  .post(veifyJWT, verifyRoles("Admin", "Teacher"), upload.single('thumbnail'), createCourse)

router.get('/teacher/:teacherId', getAllCoursesByTeacherId);

router.route('/:courseId')
  .get(getCourseWithCurriculum)
  .patch(veifyJWT, verifyRoles("Admin", "Teacher"), upload.single('thumbnail'), updateCourse) // Handle file and data
  .delete(veifyJWT, verifyRoles("Admin", "Teacher"), deleteCourse);






module.exports = router