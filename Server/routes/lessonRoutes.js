const express = require('express')
const router = express.Router()

const { addLesson, updateLesson, deleteLesson } = require('../controllers/lessonController')


router.route('/')
    .post(addLesson)
    .patch(updateLesson)
    .delete(deleteLesson)



module.exports = router