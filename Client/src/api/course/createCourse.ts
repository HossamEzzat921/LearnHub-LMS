import axios from "axios";
import type { courseType } from "../../validations/coureseSchema";


export const createCourse = async (data: courseType) => {
  try {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("level", data.level);
    formData.append("price", String(data.price));
    formData.append("teacher", data.teacher);

    if (data.thumbnail?.[0]) {
      formData.append("thumbnail", data.thumbnail[0]);
    }

    const res = await axios.post(`/courses`, formData);

   
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};