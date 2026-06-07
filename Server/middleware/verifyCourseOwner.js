const Course = require("../models/Course");

const verifyCourseOwner = async (req, res, next) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Admin can access everything
        if (req.role === "Admin") {
            return next();
        }

        // Teacher can only access their own course
        if (
            req.role === "Teacher" &&
            course.teacher.toString() === req.id
        ) {
            return next();
        }

        return res.status(403).json({
            message: "You are not allowed to modify this course"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = verifyCourseOwner;