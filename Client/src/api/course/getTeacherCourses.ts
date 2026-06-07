import axios from "axios";

export const getTeacherCourses = async (teacherId) => {
  try {
    const res = await axios.get(`/courses/teacher/${teacherId}`);
    return res.data;
  } catch (err) {
    console.error("Fetch error:", err);
  }
};
