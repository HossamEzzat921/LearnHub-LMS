import axios from "axios";

export const getAllCourses = async () => {
  try {
    const res = await axios.get(`/courses`);
    return res.data;
  } catch (err) {
    console.error("Fetch error:", err);
  }
};