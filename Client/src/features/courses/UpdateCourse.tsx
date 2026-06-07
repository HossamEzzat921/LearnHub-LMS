import { useEffect, useState } from "react";
import { getCourse, updateCourse } from "../../api";
import Curriculm from "./Curriculm";
import { useParams } from "react-router-dom";
import type { courseType } from "../../validations/coureseSchema";
import type { Section } from "../../types/Section";
import type { Course } from "../../types/Course";
import { CourseContext } from "./useCourseContext";
import PublishCourse from "./PublishCourse";
import { Tabs } from "../../components/tabs";
import UpdateCourseForm from "./UpdateCourseForm";


const UpdateCourse = () => {
  
  const { courseId } = useParams();
  console.log(courseId)
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);

  const handleUpdateCourse = async (data: courseType) => {
    try {
      const result = await updateCourse(data, courseId);

      if (result) {
        setCourseData(result);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const fetchCourse = async () => {
      const data = await getCourse( courseId );
      setCourseData(data);
      if (data) {
        setSections(data.courseCurriculum);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (!courseData) return <div>Loading course details...</div>;
  const tabs = [
    {
      label: "  Edit Course",
      icon: "📚",

      content: (
        <div>
          {" "}
          <UpdateCourseForm  onSubmit={handleUpdateCourse} />
        </div>
      ),
    },
    {
      label: "Course Curriculum",
      icon: "📝",

      content: (
        <div>
          {" "}
          <Curriculm />
        </div>
      ),
    },
    {
      label: "Publish",
      icon: "⚙️",
      content: (
        <div>
          <PublishCourse  />
        </div>
      ),
    },
  ];

  return (
    <CourseContext.Provider
      value={{
        courseId,
        sections,
        setSections,
        editingSectionId,
        setEditingSectionId,
        courseData,
        setCourseData
      }}
    >
      <section className="container mx-auto max-w-4xl">
        <Tabs tabs={tabs} />
      </section>
    </CourseContext.Provider>
  );
};

export default UpdateCourse;
export { CourseContext };
