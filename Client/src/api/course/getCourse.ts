import axios from "axios";

export const getCourse = async (courseId: string) => {
  try {
    const res = await axios.get(`/courses/${courseId}`);
    return res.data;
  } catch (err) {
    console.error("Fetch error:", err);
  }
};