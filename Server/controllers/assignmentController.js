const Assignment = require("../models/Assignment");

// Create Assignment
const createAssignment = async (req, res) => {
  try {
    const { title, description, dueDate, course ,createdBy} = req.body;

    const assignment = await Assignment.create({
      title,
      description,
      dueDate,
      course,
      createdBy
    });

    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Assignments For Course
const getCourseAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({
      course: req.params.courseId,
    })
      .populate("createdBy", "username")
      .sort({ createdAt: -1 });

    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Assignment
const getAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate("createdBy", "username");

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Assignment
const updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Assignment
const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.json({ message: "Assignment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getTeacherAssignments = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const assignments = await Assignment.find({
      createdBy: teacherId,
    })
      .populate("course", "title")
      .sort({ createdAt: -1 });

    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createAssignment,
  getCourseAssignments,
  getAssignment,
  updateAssignment,
  deleteAssignment,
  getTeacherAssignments
};