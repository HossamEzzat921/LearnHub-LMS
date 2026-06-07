import { useContext } from "react";
import { createContext } from "react";
import type { Section } from "../../types/Section";
import type { Course } from "../../types/Course";

type CourseContextType = {
  courseId: string | undefined;
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  editingSectionId: string | null;
  setEditingSectionId: React.Dispatch<React.SetStateAction<string | null>>;
 courseData: Course | null;
  setCourseData: React.Dispatch<React.SetStateAction<Course | null>>;
};
export const CourseContext = createContext<CourseContextType | null>(null);
export const useCourseContext = () => {
  const context = useContext(CourseContext);

  if (!context) {
    throw new Error("useCourse must be used داخل CourseContext.Provider");
  }

  return context;
};
