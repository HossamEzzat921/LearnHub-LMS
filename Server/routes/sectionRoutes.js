const express = require('express')
const router = express.Router()


const { getCourseWithCurriculum } = require('../controllers/courseController')
const { addSection, updateSection, deleteSection,getSectionsByCourse } = require('../controllers/sectionController')








router.route('/')
    .post(addSection)
    .get(getCourseWithCurriculum)
    .patch(updateSection)
    .delete(deleteSection)

    router.route('/:courseId')
    .get(getSectionsByCourse)




module.exports = router