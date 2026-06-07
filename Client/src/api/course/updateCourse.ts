

import axios from "axios";
import type { courseType } from "../../validations/coureseSchema";

export const updateCourse = async (
  data: courseType,
  courseId: string | undefined,
) => {
  try {
    if (!courseId) throw new Error("No course ID found");

    const formData = new FormData();

    // Append standard text fields
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("level", data.level);
    formData.append("price", String(data.price)); 
    formData.append("teacher", data.teacher);

    // Append file ONLY if a new file was selected
    if (
      data.thumbnail &&
      data.thumbnail instanceof FileList &&
      data.thumbnail.length > 0
    ) {
      formData.append("thumbnail", data.thumbnail[0]);
    }

    // --- AXIOS SWITCH HERE ---
    // 1. We use your custom `api` instance so the Bearer token header is applied automatically.
    // 2. Axios automatically manages the multi-part boundary headers for FormData.
    const res = await axios.patch(`/courses/${courseId}`, formData);

    // Axios stores the backend response body directly inside `.data`
    alert("Course updated successfully!");
    return res.data;

  } catch (err: any) {
    console.error("Update error:", err);
    
    // Safely extract the backend error message if available
    const errorMessage = err.response?.data?.message || "Error updating course. Check console.";
    alert(errorMessage);
    throw new Error(errorMessage);
  }
};