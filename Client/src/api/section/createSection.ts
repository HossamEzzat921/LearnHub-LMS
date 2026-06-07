import axios from "axios";

type GetCourseProps = {
  courseId: string | undefined;
};
export const createSection = async ({ courseId }: GetCourseProps) => {
  try {
    const { data } = await axios.post("/sections", {
      course: courseId,
    });

    return data;
  } catch (err) {
    console.error("Error creating section:", err);
    throw err;
  }
};