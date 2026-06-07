const express = require("express");
const router = express.Router();

const verifyJWT = require("../middleware/verifyJWT");

const {
    createAssignment,
    getCourseAssignments,
    getAssignment,
    updateAssignment,
    deleteAssignment,
    getTeacherAssignments
} = require("../controllers/assignmentController");

router.use(verifyJWT);

router.post("/", createAssignment);

router.get("/course/:courseId", getCourseAssignments);

router.get("/:id", getAssignment);

router.patch("/:id", updateAssignment);

router.delete("/:id", deleteAssignment);
router.get("/teacher/:teacherId", getTeacherAssignments);

module.exports = router;